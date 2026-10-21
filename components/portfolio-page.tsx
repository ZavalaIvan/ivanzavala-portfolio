import { SidebarNav } from "@/components/sidebar-nav"
import { InicioSection } from "@/components/sections/inicio"
import { ServiciosSection } from "@/components/sections/servicios"
import { MetodologiaSection, PreciosSection } from "@/components/sections/proceso"
import { SobreMiSection } from "@/components/sections/sobre-mi"
import { ContactoSection } from "@/components/sections/contacto"
import { ProyectosSection } from "@/components/sections/proyectos"
import { ProjectsOverview } from "@/components/sections/projects-overview"
import { AgentCaseStudy, AgentProjectsSection } from "@/components/sections/agent-projects"
import { pageHref, pages, siteUrl, type Locale, type PageId } from "@/lib/site"

function PageContent({ id, locale }: { id: PageId; locale: Locale }) {
  switch (id) {
    case "home": return <InicioSection locale={locale} />
    case "automation": case "ai": case "software": case "support": return <ServiciosSection service={id} locale={locale} />
    case "projects": return <ProjectsOverview locale={locale} />
    case "agents": return <AgentProjectsSection locale={locale} />
    case "carsa": case "nora": return <AgentCaseStudy id={id} locale={locale} />
    case "websites": return <ProyectosSection type="proyectos-sitios" locale={locale} />
    case "webapps": return <ProyectosSection type="proyectos-apps" locale={locale} />
    case "aitools": return <ProyectosSection type="proyectos-ai-tools" locale={locale} />
    case "experiments": return <ProyectosSection type="proyectos-experimentos" locale={locale} />
    case "methodology": return <MetodologiaSection locale={locale} />
    case "engagement": return <PreciosSection locale={locale} />
    case "about": return <SobreMiSection locale={locale} />
    case "contact": return <ContactoSection locale={locale} />
  }
}

export function PortfolioPage({ id, locale }: { id: PageId; locale: Locale }) {
  const page = pages[id]
  const person = { "@type": "Person", "@id": siteUrl + "/#person", name: "Iván Zavala", url: siteUrl, jobTitle: locale === "es" ? "Consultor y desarrollador de software, automatización e inteligencia artificial" : "Software, automation and AI consultant and developer", knowsLanguage: ["Spanish", "English"], sameAs: ["https://github.com/ZavalaIvan", "https://www.linkedin.com/in/ivan-zavala-562ab62a0/"] }
  const graph: object[] = id === "home" ? [person, { "@type": "WebSite", "@id": siteUrl + "/#website", name: "Iván Zavala", url: siteUrl, inLanguage: ["es", "en"], publisher: { "@id": person["@id"] } }] : [{ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: siteUrl + pageHref("home", locale) }, { "@type": "ListItem", position: 2, name: page.titles[locale], item: siteUrl + page.paths[locale] }] }]
  if (["automation", "ai", "software", "support"].includes(id)) graph.push({ "@type": "Service", name: page.titles[locale], description: page.descriptions[locale], url: siteUrl + page.paths[locale], provider: person })
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")
  return <>
    <a href="#contenido" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-foreground">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
    <div className="flex min-h-screen"><SidebarNav activePage={id} locale={locale} /><main id="contenido" tabIndex={-1} className="min-w-0 flex-1 outline-none"><div className={`mx-auto px-6 py-16 lg:px-12 lg:py-12 ${["agents", "carsa", "nora"].includes(id) ? "max-w-6xl" : "max-w-3xl"}`}><PageContent id={id} locale={locale} /></div></main></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  </>
}
