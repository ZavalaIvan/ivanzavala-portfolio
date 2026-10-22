// Offline checks: business invariants and HTTP contracts; never uses account credentials.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function load(file) {
  const source = fs.readFileSync(path.join(__dirname, '..', 'lib/agent-prototypes', file), 'utf8').replace('import "server-only"', '');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const mod = { exports: {} };
  new Function('exports', 'module', outputText)(mod.exports, mod);
  return mod.exports;
}
const support = load('support.ts');
const booking = load('booking.ts');
const connectors = load('connectors.ts');
const checks = [];
function check(name, run) { checks.push(Promise.resolve().then(run).then(() => name)); }

check('Documented access receives a source-backed guide', () => {
  const result = support.triageSupport(support.supportScenarios.access, support.knowledgeBase('es'));
  assert.equal(result.action, 'guide'); assert.equal(result.article.id, 'KB-001'); assert.equal(result.ticket, undefined);
});
check('Team incidents escalate with impact and attempted checks', () => {
  const result = support.triageSupport(support.supportScenarios.incident, support.knowledgeBase('en'));
  assert.equal(result.action, 'handoff'); assert.equal(result.ticket.priority, 'high');
  assert.deepEqual(JSON.parse(result.ticket.body), { topic: 'sync', impact: 'team', alreadyTried: true, knowledgeSource: 'KB-002' });
});
check('Unknown topics do not invent an article', () => {
  const result = support.triageSupport(support.supportScenarios.unknown, support.knowledgeBase('es'));
  assert.equal(result.action, 'handoff'); assert.equal(result.article, undefined);
});
check('Appointment buffers and closing time are respected', () => {
  const slots = booking.availableSlots('2026-11-10', 30, []);
  assert.equal(slots.find(s => s.start === 9 * 60).available, true);
  assert.equal(slots.find(s => s.start === 9 * 60 + 30).available, false);
  assert.equal(slots.find(s => s.start === 11 * 60).available, false);
  assert.equal(slots.find(s => s.start === 11 * 60 + 30).available, true);
  assert.equal(slots.find(s => s.start === 14 * 60 + 30).available, false);
});
check('Repeated and overlapping local reservations are rejected', () => {
  const input = { date: '2026-11-10', service: 'discovery', start: 690 };
  const first = booking.confirmDemoBooking(input, []); assert.equal(first.ok, true);
  assert.equal(booking.confirmDemoBooking(input, [first.booking]).ok, false);
  assert.equal(booking.confirmDemoBooking({ ...input, start: 720 }, [first.booking]).ok, false);
  assert.equal(booking.confirmDemoBooking({ ...input, start: 750 }, [first.booking]).ok, true);
});
check('Dates and services outside the demo are rejected', () => {
  assert.deepEqual(booking.availableSlots('2026-11-12', 30, []), []);
  assert.equal(booking.confirmDemoBooking({ date: '2026-11-10', start: 540, service: 'invalid' }, []).ok, false);
  assert.deepEqual(booking.availableSlots('2026-11-10', 45, []), []);
});

(async () => {
  await Promise.all(checks);
  const nativeFetch = global.fetch;
  const requests = [];
  try {
    global.fetch = async (url, options) => {
      requests.push({ url, options });
      return Response.json({ number: 42 });
    };
    const issue = await connectors.githubTickets(async () => 'offline-test-token', 'demo-owner', 'demo-repo').create({ title: 'Example', body: 'Local fixture' });
    assert.equal(issue.number, 42);
    assert.equal(requests[0].url, 'https://api.github.com/repos/demo-owner/demo-repo/issues');
    assert.equal(requests[0].options.headers['X-GitHub-Api-Version'], '2026-03-10');
    assert.deepEqual(JSON.parse(requests[0].options.body), { title: 'Example', body: 'Local fixture' });
    assert.throws(() => connectors.githubTickets(async () => '', 'bad/owner', 'repo'));

    const config = { getAccessToken: async () => 'offline-test-token', calendarId: 'demo@example.test', timeZone: 'America/Mexico_City' };
    global.fetch = async (url, options) => { requests.push({ url, options }); return Response.json({ calendars: { [config.calendarId]: { busy: [{ start: '2026-11-10T10:00:00-06:00', end: '2026-11-10T11:00:00-06:00' }] } } }); };
    const busy = await connectors.calendarBusy(config, '2026-11-10T09:00:00-06:00', '2026-11-10T15:00:00-06:00');
    assert.equal(busy.length, 1); assert.equal(requests.at(-1).url, 'https://www.googleapis.com/calendar/v3/freeBusy');
    assert.equal(JSON.parse(requests.at(-1).options.body).timeZone, config.timeZone);
    global.fetch = async () => Response.json({ calendars: { [config.calendarId]: { errors: [{ reason: 'notFound' }] } } });
    await assert.rejects(connectors.calendarBusy(config, 'start', 'end'), /could not be verified/);

    global.fetch = async (url, options) => { requests.push({ url, options }); return Response.json({ id: 'abcde12345' }); };
    await connectors.calendarEvent(config, { id: 'abcde12345', summary: 'Example booking', start: '2026-11-10T11:30:00-06:00', end: '2026-11-10T12:00:00-06:00' });
    assert.ok(requests.at(-1).url.includes('/calendars/demo%40example.test/events'));
    assert.equal(JSON.parse(requests.at(-1).options.body).start.timeZone, config.timeZone);
    await assert.rejects(connectors.calendarEvent(config, { id: 'INVALID!', summary: '', start: 'bad', end: 'bad' }), /Invalid stable/);
    global.fetch = async () => new Response('', { status: 403 });
    await assert.rejects(connectors.githubTickets(async () => '', 'owner', 'repo').create({ title: '', body: '' }), /HTTP 403/);
  } finally { global.fetch = nativeFetch; }
  console.log(JSON.stringify({ passed: true, businessScenarios: checks.length, connectorContracts: 4, externalRequests: 0 }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
