export type DemoBooking = { id: string; date: string; start: number; end: number; service: string }
export const demoDates = ["2026-11-09", "2026-11-10", "2026-11-11"] as const
export const demoServices = [{ id: "discovery", minutes: 30 }, { id: "review", minutes: 60 }] as const
const open = 9 * 60
const close = 15 * 60
const buffer = 15

export const formatTime = (minutes: number) => `${Math.floor(minutes / 60).toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`
export function overlaps(a: { start: number; end: number }, b: { start: number; end: number }) {
  return a.start < b.end && b.start < a.end
}

// showcase:start booking-availability
export function availableSlots(date: string, duration: number, bookings: DemoBooking[]) {
  if (!demoDates.some(day => day === date) || ![30, 60].includes(duration)) return []
  const busy = [{ start: 10 * 60, end: 11 * 60 }, ...bookings.filter(b => b.date === date)]
  return Array.from({ length: (close - open) / 30 }, (_, index) => {
    const start = open + index * 30
    const end = start + duration
    const available = end + buffer <= close && !busy.some(event =>
      overlaps({ start, end: end + buffer }, { start: event.start, end: event.end + buffer }))
    return { start, end, available }
  })
}
// showcase:end booking-availability

// showcase:start booking-confirmation
export function confirmDemoBooking(
  input: { date: string; start: number; service: string },
  bookings: DemoBooking[],
): { ok: true; booking: DemoBooking } | { ok: false; reason: "service" | "unavailable" } {
  const service = demoServices.find(item => item.id === input.service)
  if (!service) return { ok: false, reason: "service" }
  const slot = availableSlots(input.date, service.minutes, bookings)
    .find(item => item.start === input.start && item.available)
  if (!slot) return { ok: false, reason: "unavailable" }
  return { ok: true, booking: {
    id: `DEMO-${bookings.length + 1}`, date: input.date,
    start: slot.start, end: slot.end, service: service.id,
  } }
}
// showcase:end booking-confirmation
