"use client"

import { useState } from "react"
import { ArrowRight, BookOpen, FileCheck2, LifeBuoy, UserRound } from "lucide-react"
import { knowledgeBase, supportScenarios, triageSupport, type SupportScenario } from "@/lib/agent-prototypes/support"
import type { Locale } from "@/lib/site"
import { DemoShell, DemoTrace, demoButton } from "./demo-shell"

export function SupportDemo({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const [scenario, setScenario] = useState<SupportScenario>("access")
  const [ticketReady, setTicketReady] = useState(false)
  const request = supportScenarios[scenario]
  const result = triageSupport(request, knowledgeBase(locale))
  const labels = en ? { access: "Recover access", incident: "Escalate an incident", unknown: "Missing documentation" } : { access: "Recuperar acceso", incident: "Escalar una incidencia", unknown: "Sin documentación" }
  const question = en ? { access: "I can't access my workspace. How can I get back in?", incident: "The whole team has a sync problem. We already tried the documented checks.", unknown: "Can I connect a device that isn't covered in your documentation?" } : { access: "No puedo entrar a mi espacio de trabajo. ¿Cómo recupero el acceso?", incident: "Todo el equipo tiene un problema de sincronización. Ya hicimos las comprobaciones documentadas.", unknown: "¿Puedo conectar un dispositivo que no aparece en su documentación?" }
  const chooseScenario = (next: SupportScenario) => { setScenario(next); setTicketReady(false) }
  const steps = [
    { title: en ? "Request structured" : "Solicitud estructurada", detail: en ? "Topic and impact come from the selected scenario." : "El tema y el impacto provienen del escenario elegido." },
    { title: en ? "Knowledge consulted" : "Conocimiento consultado", detail: result.article ? `${result.article.id} · ${en ? "Approved sample article" : "Artículo de ejemplo aprobado"}` : (en ? "No matching article. Human review requested." : "Sin artículo aplicable. Se solicita revisión humana.") },
    { title: result.action === "guide" ? (en ? "Documented guidance" : "Guía documentada") : (en ? "Human handoff" : "Derivación humana"), detail: result.action === "guide" ? (en ? "Steps are taken from the local knowledge base." : "Los pasos provienen de la base local de conocimiento.") : (en ? "Summary, impact and source are included in the draft." : "El borrador incluye resumen, impacto y fuente.") },
    ...(ticketReady ? [{ title: en ? "Demo ticket prepared" : "Ticket de prueba preparado", detail: en ? "DEMO-1042 · Kept only in this view." : "DEMO-1042 · Solo se conserva en esta vista." }] : []),
  ]
  return <DemoShell name="NEXO" label={en ? "Technical support" : "Soporte técnico"} locale={locale} onReset={() => chooseScenario("access")}>
    <div className="grid lg:grid-cols-[1.3fr_1fr]">
      <div className="min-w-0 border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="mb-5 flex items-center gap-2 text-xs text-[#a7b8b4]"><LifeBuoy aria-hidden="true" className="h-4 w-4 text-[#a5ebcc]" />{en ? "Customer workspace · Example company" : "Espacio del cliente · Empresa de ejemplo"}</div>
        <p className="mb-2 text-[10px] font-mono uppercase tracking-wider text-[#9caeac]">{en ? "Choose a scenario" : "Elige un escenario"}</p>
        <div className="mb-6 flex flex-wrap gap-2">{(Object.keys(labels) as SupportScenario[]).map(id => <button key={id} type="button" aria-pressed={scenario === id} onClick={() => chooseScenario(id)} className={`${demoButton} ${scenario === id ? "border-[#a5ebcc]/50 bg-[#a5ebcc]/10 text-[#a5ebcc]" : "text-[#c6d2cf]"}`}>{labels[id]}</button>)}</div>
        <div className="space-y-4" aria-live="polite">
          <div className="ml-6 rounded-xl rounded-tr-sm bg-[#263338] p-4"><p className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-[#a7b8b4]"><UserRound aria-hidden="true" className="h-3 w-3" />{en ? "Sample customer" : "Cliente de ejemplo"}</p><p className="text-sm leading-relaxed">{question[scenario]}</p></div>
          <div className="mr-4 rounded-xl rounded-tl-sm border border-[#a5ebcc]/20 bg-[#a5ebcc]/5 p-4"><p className="mb-2 text-[10px] font-mono uppercase tracking-wider text-[#a5ebcc]">NEXO · {en ? "Guided response" : "Respuesta guiada"}</p>
            {result.action === "guide" && result.article ? <><p className="text-sm leading-relaxed">{en ? "Let's review the steps in the access guide." : "Revisemos los pasos de la guía de acceso."}</p><ol className="mt-3 list-decimal space-y-2 pl-4 text-xs leading-relaxed text-[#c6d2cf]">{result.article.steps.map(step => <li key={step}>{step}</li>)}</ol></> : <p className="text-sm leading-relaxed">{scenario === "unknown" ? (en ? "There is no approved guide for this device. I'll prepare the case for a specialist to review." : "No hay una guía aprobada para este dispositivo. Prepararé el caso para que lo revise un especialista.") : (en ? "This affects the whole team and the initial checks are complete. A high-priority technical review is appropriate." : "El problema afecta a todo el equipo y las comprobaciones iniciales ya se realizaron. Corresponde una revisión técnica de prioridad alta.")}</p>}
          </div>
        </div>
        {result.action === "handoff" && <button type="button" disabled={ticketReady} onClick={() => setTicketReady(true)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#a5ebcc] px-4 py-2.5 text-xs font-semibold text-[#101719] hover:bg-[#baf3db] disabled:opacity-60"><FileCheck2 aria-hidden="true" className="h-4 w-4" />{ticketReady ? (en ? "DEMO-1042 prepared" : "DEMO-1042 preparado") : (en ? "Prepare demo ticket" : "Preparar ticket de prueba")}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></button>}
      </div>
      <div className="space-y-4 bg-[#151e20] p-4 sm:p-6"><DemoTrace locale={locale} steps={steps} /><div className="rounded-xl border border-white/10 bg-[#101719] p-4"><p className="mb-3 flex items-center gap-2 text-xs font-medium"><BookOpen aria-hidden="true" className="h-4 w-4 text-[#a5ebcc]" />{en ? "Case context" : "Contexto del caso"}</p><dl className="space-y-3 text-xs"><div className="flex justify-between gap-3"><dt className="text-[#9caeac]">{en ? "Source" : "Fuente"}</dt><dd>{result.article?.id ?? (en ? "Human review" : "Revisión humana")}</dd></div><div className="flex justify-between gap-3"><dt className="text-[#9caeac]">{en ? "Priority" : "Prioridad"}</dt><dd className={request.impact === "team" ? "text-[#f5d19b]" : "text-[#a5ebcc]"}>{request.impact === "team" ? (en ? "High" : "Alta") : (en ? "Normal" : "Normal")}</dd></div><div className="flex justify-between gap-3"><dt className="text-[#9caeac]">GitHub Issues API</dt><dd className="text-[#f5d19b]">{en ? "Adapter only" : "Adaptador preparado"}</dd></div></dl>{ticketReady && <div className="mt-4 break-words rounded-lg border border-[#a5ebcc]/25 bg-[#a5ebcc]/5 p-3"><p className="text-xs font-semibold text-[#a5ebcc]">DEMO-1042</p><p className="mt-2 text-xs leading-relaxed">{en ? "Draft includes the topic, impact, attempted checks and knowledge reference. No issue has been sent to GitHub." : "El borrador reúne tema, impacto, comprobaciones y referencia de conocimiento. No se ha enviado ninguna incidencia a GitHub."}</p><details className="mt-3 text-[11px] text-[#9caeac]"><summary className="cursor-pointer">{en ? "View structured draft" : "Ver borrador estructurado"}</summary><pre className="mt-2 max-w-full overflow-x-auto text-[10px]">{result.ticket?.body}</pre></details></div>}</div></div>
    </div>
  </DemoShell>
}
