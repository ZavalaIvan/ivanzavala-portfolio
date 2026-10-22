"use client"

import { useState } from "react"
import { CalendarDays, Check, Clock3, Globe2, ArrowRight } from "lucide-react"
import { availableSlots, confirmDemoBooking, demoDates, demoServices, formatTime, type DemoBooking } from "@/lib/agent-prototypes/booking"
import type { Locale } from "@/lib/site"
import { DemoShell, DemoTrace, demoButton } from "./demo-shell"

export function BookingDemo({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const [date, setDate] = useState<string>(demoDates[1])
  const [service, setService] = useState<string>("discovery")
  const [selected, setSelected] = useState<number | null>(11 * 60 + 30)
  const [bookings, setBookings] = useState<DemoBooking[]>([])
  const [confirmed, setConfirmed] = useState<DemoBooking | null>(null)
  const [error, setError] = useState(false)
  const duration = demoServices.find(item => item.id === service)!.minutes
  const slots = availableSlots(date, duration, bookings)
  const selectedSlot = slots.find(slot => slot.start === selected && slot.available)
  function reset() { setDate(demoDates[1]); setService("discovery"); setSelected(11 * 60 + 30); setBookings([]); setConfirmed(null); setError(false) }
  function confirm() {
    if (selected === null) return
    const result = confirmDemoBooking({ date, start: selected, service }, bookings)
    if (!result.ok) { setError(true); return }
    setBookings(previous => [...previous, result.booking]); setConfirmed(result.booking); setSelected(null); setError(false)
  }
  const steps = [
    { title: en ? "Service rules loaded" : "Reglas del servicio cargadas", detail: `${duration} min · ${en ? "15 min buffer" : "15 min entre citas"}` },
    { title: en ? "Sample agenda checked" : "Agenda de ejemplo consultada", detail: en ? "Opening hours and occupied blocks are applied." : "Se aplican horarios de atención y bloques ocupados." },
    { title: confirmed ? (en ? "Demo booking recorded" : "Reserva de prueba registrada") : (en ? "Available slots calculated" : "Horarios disponibles calculados"), detail: confirmed ? `${confirmed.id} · ${formatTime(confirmed.start)}–${formatTime(confirmed.end)}` : (en ? "The slot is checked again before confirmation." : "El horario se valida de nuevo antes de confirmar.") },
  ]
  return <DemoShell name="TURNO" label={en ? "Appointments" : "Reservas y citas"} locale={locale} onReset={reset} accent="amber">
    <div className="grid lg:grid-cols-[1.3fr_1fr]">
      <div className="min-w-0 border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r"><div className="mb-5 flex items-center gap-2 text-xs text-[#a7b8b4]"><CalendarDays aria-hidden="true" className="h-4 w-4 text-[#f5d19b]" />{en ? "Digital consulting · Example business" : "Consultoría digital · Negocio de ejemplo"}</div>
        <label htmlFor="demo-service" className="mb-2 block text-[10px] font-mono uppercase tracking-wider text-[#9caeac]">{en ? "Choose a service" : "Elige un servicio"}</label><select id="demo-service" value={service} onChange={event => { setService(event.target.value); setSelected(null); setConfirmed(null); setError(false) }} className="mb-5 w-full rounded-lg border border-white/15 bg-[#202c30] p-3 text-sm text-[#edf4f2] outline-offset-4"><option value="discovery">{en ? "Discovery call · 30 min" : "Diagnóstico inicial · 30 min"}</option><option value="review">{en ? "Project review · 60 min" : "Revisión de proyecto · 60 min"}</option></select>
        <p className="mb-3 text-xs text-[#c6d2cf]">{en ? "Sample week · November 2026" : "Semana de ejemplo · Noviembre de 2026"}</p><div className="mb-5 grid grid-cols-3 gap-2">{demoDates.map((day,index) => <button type="button" key={day} aria-pressed={date === day} onClick={() => { setDate(day); setSelected(null); setConfirmed(null); setError(false) }} className={`${demoButton} flex flex-col items-center gap-1 ${date === day ? "border-[#f5d19b]/60 bg-[#f5d19b]/10 text-[#f5d19b]" : "text-[#a7b8b4]"}`}><span className="text-[10px] uppercase">{(en ? ["Mon", "Tue", "Wed"] : ["Lun", "Mar", "Mié"])[index]}</span><span className="text-lg font-semibold">{9 + index}</span></button>)}</div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-medium">{en ? "Available times" : "Horarios disponibles"}</p><p className="flex items-center gap-1 text-[10px] text-[#9caeac]"><Globe2 aria-hidden="true" className="h-3 w-3" />America/Mexico_City · UTC−06:00</p></div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{slots.map(slot => <button key={slot.start} type="button" disabled={!slot.available} aria-pressed={selected === slot.start} aria-label={`${formatTime(slot.start)} · ${slot.available ? (en ? "Available" : "Disponible") : (en ? "Unavailable" : "No disponible")}`} onClick={() => { setSelected(slot.start); setConfirmed(null); setError(false) }} className={`${demoButton} font-mono disabled:cursor-not-allowed disabled:opacity-30 disabled:line-through ${selected === slot.start ? "border-[#f5d19b]/60 bg-[#f5d19b]/10 text-[#f5d19b]" : "text-[#c6d2cf]"}`}>{formatTime(slot.start)}</button>)}</div>
        <button type="button" disabled={!selectedSlot} onClick={confirm} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f5d19b] px-4 py-3 text-xs font-semibold text-[#101719] hover:bg-[#ffe0b3] disabled:cursor-not-allowed disabled:opacity-40">{en ? "Confirm demo booking" : "Confirmar reserva de prueba"}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></button>
        <p className="mt-3 text-[10px] leading-relaxed text-[#9caeac]">{en ? "No personal information is requested. Bookings stay in this view until reset or reload." : "No se solicitan datos personales. Las reservas duran hasta reiniciar o recargar esta vista."}</p>
      </div>
      <div className="space-y-4 bg-[#151e20] p-4 sm:p-6"><div className="rounded-xl border border-white/10 bg-[#101719] p-4"><p className="mb-3 text-[10px] font-mono uppercase tracking-wider text-[#f5d19b]">TURNO · {en ? "Booking summary" : "Resumen de reserva"}</p><p className="text-sm leading-relaxed">{confirmed ? (en ? "Your sample appointment is recorded locally." : "Tu cita de ejemplo quedó registrada localmente.") : (en ? "Choose a time. I will check the service rules before recording the sample appointment." : "Elige un horario. Comprobaré las reglas del servicio antes de registrar la cita de ejemplo.")}</p><div className="mt-4 flex items-center gap-2 text-xs text-[#a7b8b4]"><Clock3 aria-hidden="true" className="h-4 w-4" />{duration} min<span className="mx-1 text-white/20">/</span>{date}<span className="mx-1 text-white/20">/</span>{confirmed ? formatTime(confirmed.start) : selectedSlot ? formatTime(selectedSlot.start) : "—"}</div>{confirmed && <p role="status" className="mt-4 flex items-center gap-2 rounded-lg bg-[#a5ebcc]/10 p-3 text-xs text-[#a5ebcc]"><Check aria-hidden="true" className="h-4 w-4" />{confirmed.id} · {en ? "Local booking confirmed" : "Reserva local confirmada"}</p>}{error && <p role="alert" className="mt-3 text-xs text-[#f5d19b]">{en ? "That slot is no longer available. Choose another time." : "Ese horario ya no está disponible. Elige otro."}</p>}</div><DemoTrace locale={locale} steps={steps} /><p className="flex flex-wrap justify-between gap-2 rounded-lg border border-white/10 px-4 py-3 text-[11px]"><span className="text-[#9caeac]">Google Calendar API v3</span><span className="text-[#f5d19b]">{en ? "Adapter only" : "Adaptador preparado"}</span></p></div>
    </div>
  </DemoShell>
}
