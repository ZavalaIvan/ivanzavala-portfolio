import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { ReactNode } from "react"
import { pageHref, type Locale } from "@/lib/site"

export const cardClass = "rounded-lg border border-border bg-card p-5"
export function SectionHeading({ label, title, description }: { label: string; title: string; description: string }) {
  return <header className="flex flex-col gap-4"><p className="text-xs font-mono uppercase tracking-widest text-emerald-500 dark:text-emerald-400">{label}</p><h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{title}</h1><p className="text-base text-muted-foreground leading-relaxed">{description}</p></header>
}
export function CheckList({ items }: { items: string[] }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex items-start gap-3 rounded-md bg-secondary/50 p-3 text-sm"><Check aria-hidden="true" className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" /><span>{item}</span></li>)}</ul>
}
export function ContactCta({ locale, title, children }: { locale: Locale; title?: string; children?: ReactNode }) {
  return <section className={`${cardClass} bg-accent/30 flex flex-col gap-3`}><h2 className="text-xl font-semibold">{title ?? (locale === "es" ? "Hablemos de lo que necesita tu negocio" : "Let's talk about what your business needs")}</h2><div className="text-sm text-muted-foreground leading-relaxed">{children ?? (locale === "es" ? "Cuéntame el problema, las herramientas que utilizas y qué te gustaría mejorar. Definimos juntos el alcance de tu proyecto." : "Tell me about the problem, the tools you use and what you want to improve. We'll define the scope of your project together.")}</div><Link href={pageHref("contact", locale)} className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">{locale === "es" ? "Cuéntame tu proyecto" : "Tell me about your project"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>
}

