import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { pageHref, type Locale } from "@/lib/site"
import { cardClass, ContactCta, SectionHeading } from "@/components/section-ui"
import { AgentProjectCards } from "@/components/sections/agent-projects"

export function ProjectsOverview({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const projects = en ? [
    { title: "Business process automations", ready: true, description: "Workflows that connect tools and reduce repetitive work. Built around the information and steps each operation needs.", focus: "Automation · Integrations" },
    { title: "Centralized marketing system", ready: false, description: "A system to centralize and automate work with Meta tools and make the operation easier to manage.", focus: "Marketing · Automation" },
    { title: "Independent online store", ready: false, description: "A custom ecommerce platform with its own interface and business workflows, accounting for payments and operating costs.", focus: "Ecommerce · Custom software" },
    { title: "Security equipment integration", ready: false, description: "An application to centralize the management of security equipment through integrations with Hikvision APIs.", focus: "API integration · Web application" },
  ] : [
    { title: "Automatizaciones de procesos", ready: true, description: "Flujos que conectan herramientas y reducen tareas repetitivas. Desarrollados alrededor de la información y los pasos que necesita cada operación.", focus: "Automatización · Integraciones" },
    { title: "Sistema de marketing centralizado", ready: false, description: "Un sistema para centralizar y automatizar el trabajo con herramientas de Meta y facilitar la gestión de la operación.", focus: "Marketing · Automatización" },
    { title: "Tienda en línea independiente", ready: false, description: "Una plataforma de comercio electrónico con interfaz y procesos propios, considerando los pagos y los gastos de operación.", focus: "Comercio electrónico · Software a medida" },
    { title: "Integración de equipos de seguridad", ready: false, description: "Una aplicación para centralizar la gestión de equipos de seguridad mediante integraciones con APIs de Hikvision.", focus: "Integración de APIs · Aplicación web" },
  ]
  const galleries = [
    { id: "agents" as const, title: en ? "AI agents · CARSA and NORA" : "Agentes IA · CARSA y NORA" },
    { id: "websites" as const, title: en ? "Websites" : "Sitios web" },
    { id: "webapps" as const, title: en ? "Web applications" : "Aplicaciones web" },
    { id: "aitools" as const, title: en ? "AI tools" : "Herramientas de IA" },
    { id: "experiments" as const, title: en ? "Interaction experiments" : "Experimentos de interacción" },
  ]
  return <div className="flex flex-col gap-10 py-6"><SectionHeading label={en ? "Selected work" : "Mi trabajo"} title={en ? "Projects in automation, AI and software" : "Proyectos de automatización, IA y software"} description={en ? "A look at completed work and projects currently in development, followed by a collection of websites, application demos and experiments." : "Un vistazo al trabajo listo y a los proyectos que siguen en desarrollo, junto con una colección de sitios, demostraciones de aplicaciones y experimentos."} />
    <section className="flex flex-col gap-5"><h2 className="text-xl font-semibold">{en ? "AI agents: two developed projects" : "Agentes IA: dos proyectos desarrollados"}</h2><AgentProjectCards locale={locale} compact /></section>
    <section className="grid gap-4 sm:grid-cols-2">{projects.map(project => <article key={project.title} className={`${cardClass} flex flex-col gap-3`}><div><span className={project.ready ? "inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400" : "inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"}>{project.ready ? (en ? "Ready" : "Listo") : (en ? "In development" : "En desarrollo")}</span></div><h2 className="text-lg font-semibold">{project.title}</h2><p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p><p className="mt-auto pt-2 text-xs font-mono text-muted-foreground">{project.focus}</p></article>)}</section>
    <section className="flex flex-col gap-4"><h2 className="text-xl font-semibold">{en ? "Portfolio and demonstrations" : "Portafolio y demostraciones"}</h2><p className="text-sm leading-relaxed text-muted-foreground">{en ? "Explore interfaces, web experiences and tools. Demonstrations show design and functionality; their status is identified in each collection." : "Explora interfaces, experiencias web y herramientas. Las demostraciones muestran diseño y funcionamiento; su estado se identifica en cada colección."}</p><div className="grid gap-3 sm:grid-cols-2">{galleries.map(gallery => <Link key={gallery.id} href={pageHref(gallery.id, locale)} className={`${cardClass} flex items-center justify-between gap-3 text-sm font-medium hover:bg-accent/50`}>{gallery.title}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>)}</div></section>
    <ContactCta locale={locale} title={en ? "Want to explore a similar solution?" : "¿Quieres conocer una solución similar?"}>{en ? "Tell me which project interests you and what your business needs. We can review the approach and available functions together." : "Cuéntame qué proyecto te interesa y qué necesita tu negocio. Podemos revisar juntos el enfoque y las funciones disponibles."}</ContactCta>
  </div>
}
