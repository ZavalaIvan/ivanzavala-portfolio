import type { Locale } from "@/lib/site"

export type PrototypeId = "supportAgent" | "bookingAgent"
export const prototypeIds: PrototypeId[] = ["supportAgent", "bookingAgent"]
export const prototypePreviewHref = (id: PrototypeId, locale: Locale) => locale === "es"
  ? `/demos/${id === "supportAgent" ? "soporte-tecnico" : "reservas-citas"}`
  : `/en/demos/${id === "supportAgent" ? "technical-support" : "appointments"}`

export function prototypeCopy(id: PrototypeId, locale: Locale) {
  const en = locale === "en"
  const support = id === "supportAgent"
  return {
    name: support ? "NEXO" : "TURNO",
    label: support ? (en ? "Technical support agent" : "Agente de soporte técnico") : (en ? "Booking and appointment agent" : "Agente de reservas y citas"),
    image: `/projects/agents/${support ? "nexo-support" : "turno-booking"}.webp`,
    imageWidth: support ? 1366 : 1362,
    imageHeight: support ? 599 : 677,
    imageAlt: support ? (en ? "Actual NEXO prototype interface with support guidance, knowledge sources and execution trace" : "Interfaz real del prototipo NEXO con guía de soporte, fuentes de conocimiento y registro de ejecución") : (en ? "Actual TURNO prototype interface with service selection, available times and booking summary" : "Interfaz real del prototipo TURNO con selección de servicio, horarios y resumen de reserva"),
    title: support ? (en ? "Support that connects knowledge, diagnosis and human follow-up" : "Soporte que conecta conocimiento, diagnóstico y seguimiento humano") : (en ? "A conversation can become an organized appointment" : "Una conversación puede convertirse en una cita organizada"),
    summary: support ? (en ? "A custom-code prototype for a support agent: documented guidance, escalation rules and a reviewable ticket draft. Explore the interface and the code behind each step." : "Un prototipo con código a medida para un agente de soporte: orientación documentada, reglas de escalamiento y un borrador de ticket revisable. Explora la interfaz y el código de cada paso.") : (en ? "A custom-code prototype for an appointment agent: service rules, available times and local booking confirmation. Explore how the automation works and how it could connect to Google Calendar." : "Un prototipo con código a medida para un agente de citas: reglas del servicio, horarios disponibles y confirmación local de reservas. Explora la automatización y cómo podría conectarse con Google Calendar."),
    problem: support ? (en ? "Support teams often receive incomplete requests and repeatedly explain the same checks. The proposed agent organizes the enquiry, consults approved information and hands a specialist a structured case when needed." : "Los equipos de soporte reciben solicitudes incompletas y repiten las mismas comprobaciones. El agente propuesto organiza la consulta, utiliza información aprobada y entrega un caso estructurado al especialista cuando corresponde.") : (en ? "Booking requires more than finding a free calendar cell: service duration, business hours, buffers and existing appointments must agree. The proposed agent would guide that process through conversation." : "Reservar requiere coordinar duración del servicio, horarios de atención, tiempo entre citas y compromisos existentes. El agente propuesto guiaría ese proceso mediante una conversación."),
    features: support ? (en ? [
      ["Knowledge with a source", "The sample knowledge base links each answer to an article. Unknown topics go to human review."],
      ["Escalation by impact", "An issue affecting the whole team or unresolved after initial checks prepares a specialist handoff."],
      ["A useful ticket", "The draft contains the topic, impact, checks and source. The GitHub adapter shows how it could be submitted."],
    ] : [
      ["Conocimiento con fuente", "La base de ejemplo vincula cada respuesta con un artículo. Los temas sin documentación pasan a revisión humana."],
      ["Escalamiento según el impacto", "Una incidencia que afecta al equipo o continúa tras las comprobaciones prepara la derivación a un especialista."],
      ["Un ticket útil", "El borrador incluye tema, impacto, comprobaciones y fuente. El adaptador de GitHub muestra cómo podría enviarse."],
    ]) : (en ? [
      ["Availability with rules", "30- and 60-minute services, business hours, occupied blocks and 15-minute buffers are implemented in TypeScript."],
      ["Explicit confirmation", "The selected time is checked again before recording the sample booking. Occupied times stop being available in this view."],
      ["An external calendar adapter", "The code includes separate Google Calendar availability and event-creation adapters with server-side authorization."],
    ] : [
      ["Disponibilidad con reglas", "Servicios de 30 y 60 minutos, horarios de atención, bloques ocupados y márgenes de 15 minutos implementados en TypeScript."],
      ["Confirmación explícita", "El horario se valida de nuevo antes de registrar la reserva de ejemplo. Los horarios ocupados dejan de estar disponibles en esta vista."],
      ["Un adaptador de calendario", "El código incluye adaptadores separados para consultar disponibilidad y crear eventos en Google Calendar con autorización del servidor."],
    ]),
    flow: support ? (en ? ["Structured request", "Knowledge lookup", "Impact rules", "Guidance or handoff", "Reviewable draft"] : ["Solicitud estructurada", "Consulta de conocimiento", "Reglas de impacto", "Guía o derivación", "Borrador revisable"]) : (en ? ["Service and date", "Business rules", "Availability", "User confirmation", "Booking record"] : ["Servicio y fecha", "Reglas del negocio", "Disponibilidad", "Confirmación del usuario", "Registro de reserva"]),
    connections: support ? (en ? [
      ["Knowledge base", "Local sample articles", "Implemented in the demo"],
      ["Ticket preparation", "Typed draft and impact rules", "Implemented in the demo"],
      ["GitHub Issues REST API", "Server-side submission adapter", "Prepared; no account connected"],
      ["AI model", "JSON Schema tool contracts", "Designed; no model connected"],
    ] : [
      ["Base de conocimiento", "Artículos locales de ejemplo", "Implementado en la demo"],
      ["Preparación de tickets", "Borrador tipado y reglas de impacto", "Implementado en la demo"],
      ["API REST de GitHub Issues", "Adaptador de envío desde servidor", "Preparado; sin cuenta conectada"],
      ["Modelo de IA", "Contratos de herramientas en JSON Schema", "Diseñado; sin modelo conectado"],
    ]) : (en ? [
      ["Booking engine", "Intervals, buffers and validation", "Implemented in the demo"],
      ["Booking record", "In-memory state in the current view", "Implemented; cleared on reload"],
      ["Google Calendar API v3", "freeBusy and events adapters", "Prepared; no account connected"],
      ["AI model", "JSON Schema tool contracts", "Designed; no model connected"],
    ] : [
      ["Motor de reservas", "Intervalos, márgenes y validación", "Implementado en la demo"],
      ["Registro de reservas", "Estado en memoria de la vista actual", "Implementado; se borra al recargar"],
      ["API v3 de Google Calendar", "Adaptadores freeBusy y events", "Preparado; sin cuenta conectada"],
      ["Modelo de IA", "Contratos de herramientas en JSON Schema", "Diseñado; sin modelo conectado"],
    ]),
    nextSteps: support ? (en ? "A client implementation would add the company's real documentation, a connected AI model, authorized ticketing access, persistent history, access controls, monitoring and tests with real support cases." : "Una implementación para un cliente incorporaría su documentación real, un modelo de IA conectado, acceso autorizado al sistema de tickets, historial persistente, controles de acceso, supervisión y pruebas con sus casos de soporte.") : (en ? "A client implementation would add a connected AI model, authorized calendars, persistent storage with concurrent booking controls, identity checks for changes and cancellations, reminders and operational monitoring. The local demo does not guarantee availability across different visitors." : "Una implementación para un cliente incorporaría un modelo de IA conectado, calendarios autorizados, almacenamiento persistente con control de reservas simultáneas, validación de identidad para cambios y cancelaciones, recordatorios y supervisión operativa. La demo local no garantiza disponibilidad entre visitantes distintos."),
    sources: support ? [{ label: "GitHub Issues REST API", href: "https://docs.github.com/en/rest/issues/issues#create-an-issue" }] : [
      { label: "Google Calendar · freeBusy", href: "https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query" },
      { label: "Google Calendar · events.insert", href: "https://developers.google.com/workspace/calendar/api/v3/reference/events/insert" },
    ],
  }
}
