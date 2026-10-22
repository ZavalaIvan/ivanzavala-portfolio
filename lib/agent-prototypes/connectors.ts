import "server-only"

// Adapter examples: NOT imported by the interactive demos or exposed through API routes.
// Tokens would come from an authorized server-side OAuth / GitHub App installation.
type AccessToken = () => Promise<string>
type IssueDraft = { title: string; body: string }
type CalendarConfig = { getAccessToken: AccessToken; calendarId: string; timeZone: string }

async function checkedJson(response: Response): Promise<unknown> {
  if (!response.ok) throw new Error(`External service returned HTTP ${response.status}`)
  return response.json()
}

// showcase:start github-connection
export function githubTickets(getAccessToken: AccessToken, owner: string, repo: string) {
  if (![owner, repo].every(value => /^[\w.-]+$/.test(value))) throw new Error("Invalid repository")
  return {
    async create(draft: IssueDraft) {
      const token = await getAccessToken()
      return checkedJson(await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: "POST", signal: AbortSignal.timeout(8000),
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10", "Content-Type": "application/json" },
        body: JSON.stringify({ title: draft.title, body: draft.body }),
      }))
    },
  }
}
// showcase:end github-connection

// showcase:start calendar-availability-connection
export async function calendarBusy(config: CalendarConfig, timeMin: string, timeMax: string) {
  const token = await config.getAccessToken()
  const data = await checkedJson(await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST", signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin, timeMax, timeZone: config.timeZone,
      items: [{ id: config.calendarId }] }),
  })) as { calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }> }
  const calendar = data.calendars?.[config.calendarId]
  if (!calendar || calendar.errors?.length || !Array.isArray(calendar.busy)) {
    throw new Error("Calendar availability could not be verified")
  }
  return calendar.busy
}
// showcase:end calendar-availability-connection

// showcase:start calendar-create-connection
export async function calendarEvent(config: CalendarConfig, event: {
  id: string; summary: string; start: string; end: string;
}) {
  if (!/^[a-v0-9]{5,1024}$/.test(event.id)) throw new Error("Invalid stable event ID")
  if (!(Date.parse(event.start) < Date.parse(event.end))) throw new Error("Invalid interval")
  const token = await config.getAccessToken()
  const calendar = encodeURIComponent(config.calendarId)
  return checkedJson(await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`, {
    method: "POST", signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ id: event.id, summary: event.summary,
      start: { dateTime: event.start, timeZone: config.timeZone },
      end: { dateTime: event.end, timeZone: config.timeZone } }),
  }))
}
// showcase:end calendar-create-connection
