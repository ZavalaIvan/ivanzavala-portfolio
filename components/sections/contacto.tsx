"use client"

import { useState, type FormEvent } from "react"
import { Check, Copy, Github, Linkedin, Instagram, Code2, Mail, MessageCircle } from "lucide-react"
import { email, whatsappUrl, type Locale } from "@/lib/site"
import { cardClass, SectionHeading } from "@/components/section-ui"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/ZavalaIvan" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ivan-zavala-562ab62a0/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/ivanzavalagutierrez/" },
  { name: "CodePen", icon: Code2, href: "https://codepen.io/Ivan-Zavala" },
]
const fieldClass = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export function ContactoSection({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle")
  const [draft, setDraft] = useState<string | null>(null)

  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyState("copied") }
    catch { setCopyState("error") }
  }
  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const labels = en ? ["Name or company", "Project", "What I want to improve", "Current tools", "Timeline", "Estimated investment"] : ["Nombre o empresa", "Proyecto", "Qué quiero mejorar", "Herramientas actuales", "Plazo", "Inversión estimada"]
    const fields = ["name", "service", "need", "tools", "timeline", "budget"]
    const lines = fields.map((key, index) => {
      const value = String(data.get(key) ?? "").trim()
      return value ? `${labels[index]}: ${value}` : null
    }).filter(Boolean)
    setDraft((en ? "Hi Iván, I'd like to discuss a project.\n\n" : "Hola, Iván. Me gustaría conversar sobre un proyecto.\n\n") + lines.join("\n\n"))
  }
  const subject = en ? "Project inquiry — ivanzavala.dev" : "Consulta de proyecto — ivanzavala.dev"
  const draftMailto = draft ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}` : `mailto:${email}`
  const draftWhatsapp = draft ? `${whatsappUrl}?text=${encodeURIComponent(draft)}` : whatsappUrl

  return <div className="flex flex-col gap-10 py-6">
    <SectionHeading label={en ? "Contact · English & Spanish" : "Contacto · Español e inglés"} title={en ? "Let's discuss what your business needs" : "Hablemos de lo que necesita tu negocio"} description={en ? "Tell me what you want to improve, which tools you use and what you expect from the solution. We can define the next step together. Remote projects in English and Spanish." : "Cuéntame qué quieres mejorar, qué herramientas utilizas y qué esperas de la solución. Podemos definir juntos el siguiente paso. Atiendo proyectos remotos en español e inglés."} />
    <section className={`${cardClass} flex flex-col gap-4`}><h2 className="text-lg font-semibold">{en ? "Contact me directly" : "Escríbeme directamente"}</h2><div className="flex flex-wrap items-center gap-2"><a href={`mailto:${email}`} className="break-all font-mono text-base underline underline-offset-4">{email}</a><button type="button" onClick={copyEmail} aria-label={en ? "Copy email" : "Copiar correo"} className="rounded-md p-2 hover:bg-accent">{copyState === "copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}</button></div><p aria-live="polite" className="text-xs text-muted-foreground">{copyState === "copied" ? (en ? "Email copied." : "Correo copiado.") : copyState === "error" ? (en ? "Select the address to copy it manually." : "Selecciona la dirección para copiarla manualmente.") : (en ? "You can email me or start a conversation on WhatsApp." : "Puedes enviarme un correo o iniciar una conversación por WhatsApp.")}</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-400"><MessageCircle aria-hidden="true" className="h-4 w-4" />{en ? "Chat on WhatsApp" : "Escribirme por WhatsApp"}</a></section>
    <section className="flex flex-col gap-4"><h2 className="text-xl font-semibold">{en ? "Prepare your project inquiry" : "Prepara tu consulta"}</h2><p className="text-sm leading-relaxed text-muted-foreground">{en ? "These questions help explain your project. Review the message and choose whether to send it by email or WhatsApp." : "Estas preguntas ayudan a explicar tu proyecto. Revisa el mensaje y elige si quieres enviarlo por correo o WhatsApp."}</p>
      <form onSubmit={prepareMessage} onChange={() => setDraft(null)} className={`${cardClass} flex flex-col gap-5`}>
        <div className="grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-medium">{en ? "Name or company (optional)" : "Nombre o empresa (opcional)"}<input name="name" autoComplete="organization" maxLength={160} className={fieldClass} /></label><label className="flex flex-col gap-2 text-sm font-medium">{en ? "What do you need?" : "¿Qué necesitas?"}<select name="service" className={fieldClass}><option>{en ? "Automation" : "Automatización"}</option><option>{en ? "AI agents" : "Agentes de IA"}</option><option>{en ? "Custom software or web application" : "Software o aplicación web a medida"}</option><option>{en ? "Maintenance" : "Mantenimiento"}</option><option>{en ? "Other / let's define it together" : "Otro / lo definimos juntos"}</option></select></label></div>
        <label className="flex flex-col gap-2 text-sm font-medium">{en ? "What problem do you want to solve?" : "¿Qué problema quieres resolver?"}<textarea name="need" required rows={4} maxLength={2000} placeholder={en ? "What happens today and what would you like to change?" : "¿Qué sucede hoy y qué te gustaría cambiar?"} className={fieldClass} /></label>
        <label className="flex flex-col gap-2 text-sm font-medium">{en ? "Current tools or systems (optional)" : "Herramientas o sistemas actuales (opcional)"}<input name="tools" maxLength={300} placeholder={en ? "For example: WhatsApp, CRM or an internal system" : "Por ejemplo: WhatsApp, CRM o un sistema interno"} className={fieldClass} /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-medium">{en ? "Timeline (optional)" : "Plazo (opcional)"}<input name="timeline" maxLength={100} placeholder={en ? "Target date or flexible" : "Fecha prevista o flexible"} className={fieldClass} /></label><label className="flex flex-col gap-2 text-sm font-medium">{en ? "Estimated investment (optional)" : "Inversión estimada (opcional)"}<input name="budget" maxLength={100} placeholder={en ? "Amount and currency, or to be defined" : "Monto y moneda, o por definir"} className={fieldClass} /></label></div>
        <button type="submit" className="w-fit rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">{en ? "Prepare message" : "Preparar mensaje"}</button>
      </form>
      {draft && <div role="status" className={`${cardClass} flex flex-col gap-4`}><h3 className="text-base font-semibold">{en ? "Your message is ready to review" : "Tu mensaje está listo para revisar"}</h3><p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">{draft}</p><div className="flex flex-wrap gap-3"><a href={draftMailto} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"><Mail aria-hidden="true" className="h-4 w-4" />{en ? "Open email draft" : "Abrir borrador de correo"}</a><a href={draftWhatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-medium"><MessageCircle aria-hidden="true" className="h-4 w-4" />{en ? "Continue on WhatsApp" : "Continuar en WhatsApp"}</a></div><p className="text-xs text-muted-foreground">{en ? "Nothing has been sent yet. Your email or WhatsApp app opens so you can review and send the message." : "Aún no se ha enviado nada. Se abrirá tu aplicación de correo o WhatsApp para que revises y envíes el mensaje."}</p></div>}
    </section>
    <section className="flex flex-col gap-3"><h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{en ? "Find me online" : "Encuéntrame en línea"}</h2><div className="flex flex-wrap gap-3">{socialLinks.map(({ name, icon: Icon, href }) => <a key={name} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><Icon aria-hidden="true" className="h-4 w-4" />{name}</a>)}</div></section>
  </div>
}
