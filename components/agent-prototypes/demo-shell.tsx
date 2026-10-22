import type { ReactNode } from "react"
import { ArrowUpRight, Check, Circle, RotateCcw } from "lucide-react"
import type { Locale } from "@/lib/site"

export function DemoShell({ name, label, locale, children, onReset, accent = "mint" }: {
  name: string; label: string; locale: Locale; children: ReactNode; onReset: () => void; accent?: "mint" | "amber"
}) {
  const en = locale === "en"
  return <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#101719] text-[#edf4f2] shadow-2xl shadow-black/10" data-prototype={name}>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#182124] px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3"><span className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-[#101719] ${accent === "mint" ? "bg-[#a5ebcc]" : "bg-[#f5d19b]"}`}>{name[0]}</span><div><p className="text-sm font-semibold tracking-wide">{name}<span className="ml-2 font-normal text-[#9caeac]">/ {label}</span></p><p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#9caeac]">{en ? "Custom software · Interactive prototype" : "Software a medida · Prototipo interactivo"}</p></div></div>
      <button type="button" onClick={onReset} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-[#c6d2cf] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5ebcc]"><RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />{en ? "Reset" : "Reiniciar"}</button>
    </div>
    {children}
    <div className="flex items-start gap-2 border-t border-white/10 bg-[#151e20] px-4 py-3 text-[11px] leading-relaxed text-[#a7b8b4] sm:px-6"><Circle aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 fill-amber-300 text-amber-300" /><p>{en ? "Guided scenarios with sample data. Rules run in your browser; no AI model or external account is connected. Reset clears this demo." : "Escenarios guiados con datos de ejemplo. Las reglas se ejecutan en tu navegador; el modelo de IA y las cuentas externas están pendientes de conectar. Reiniciar borra esta prueba."}</p></div>
  </div>
}

export function DemoTrace({ locale, steps }: { locale: Locale; steps: { title: string; detail: string }[] }) {
  return <div className="rounded-xl border border-white/10 bg-[#101719] p-4"><p className="mb-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-[#9caeac]">{locale === "en" ? "Execution trace" : "Registro de ejecución"}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></p><ol className="space-y-4" aria-live="polite">{steps.map((step, index) => <li key={`${index}-${step.title}`} className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#a5ebcc]/10 text-[#a5ebcc]"><Check aria-hidden="true" className="h-3 w-3" /></span><div><p className="text-xs font-medium">{step.title}</p><p className="mt-1 text-[11px] leading-relaxed text-[#9caeac]">{step.detail}</p></div></li>)}</ol></div>
}

export const demoButton = "rounded-lg border border-white/15 px-3 py-2 text-xs transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5ebcc]"
