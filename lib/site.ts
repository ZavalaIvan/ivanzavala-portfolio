import type { Metadata } from "next"

export type Locale = "es" | "en"
export type PageId = "home" | "automation" | "ai" | "software" | "support" | "projects" | "websites" | "webapps" | "aitools" | "experiments" | "methodology" | "engagement" | "about" | "contact"

export const siteUrl = "https://ivanzavala.dev"
export const email = "hola@ivanzavala.dev"
export const whatsappUrl = "https://wa.me/529993567229"

type PageDefinition = { paths: Record<Locale, string>; titles: Record<Locale, string>; descriptions: Record<Locale, string> }

export const pages: Record<PageId, PageDefinition> = {
  home: {
    paths: { es: "/", en: "/en" },
    titles: { es: "Automatización, IA y software a medida", en: "AI automation and custom software development" },
    descriptions: { es: "Iván Zavala: automatización de procesos, agentes de inteligencia artificial y aplicaciones web a medida. Trato directo, proyectos completos y capacitación.", en: "Iván Zavala builds business automations, custom AI agents and web applications. Work directly with me from planning to launch, with training included." },
  },
  automation: {
    paths: { es: "/servicios/automatizacion", en: "/en/services/automation" },
    titles: { es: "Automatización de procesos para empresas", en: "Business process and AI workflow automation" },
    descriptions: { es: "Automatiza tareas y conecta tus herramientas con integraciones a medida. Definición del proceso, implementación, pruebas y capacitación con Iván Zavala.", en: "Connect your tools and automate repetitive business processes. Workflow design, API integrations, implementation, testing and training with Iván Zavala." },
  },
  ai: {
    paths: { es: "/servicios/agentes-ia", en: "/en/services/ai-agents" },
    titles: { es: "Agentes de inteligencia artificial para empresas", en: "Custom AI agent development services" },
    descriptions: { es: "Agentes de IA a medida para atención, ventas por WhatsApp y tareas internas. Información de tu negocio, integraciones y acompañamiento de Iván Zavala.", en: "Custom AI agents for customer support, WhatsApp sales and internal workflows. Connect business knowledge and systems with direct support from Iván Zavala." },
  },
  software: {
    paths: { es: "/servicios/software-a-medida", en: "/en/services/custom-software" },
    titles: { es: "Software a medida y aplicaciones web para empresas", en: "Custom software and web application development" },
    descriptions: { es: "Desarrollo de software y aplicaciones web a medida: sistemas internos, portales y plataformas conectadas a tu negocio. Diseño, desarrollo y capacitación.", en: "Custom software and web applications for your business: internal systems, customer portals and connected platforms. Planning, design, development and training." },
  },
  support: {
    paths: { es: "/servicios/mantenimiento", en: "/en/services/maintenance" },
    titles: { es: "Mantenimiento de software y automatizaciones", en: "Software and automation maintenance" },
    descriptions: { es: "Mantenimiento mensual opcional para software, automatizaciones y agentes de IA. Revisiones, actualizaciones y soporte con un alcance acordado.", en: "Optional monthly maintenance for software, automations and AI agents. Reviews, updates and support with an agreed scope." },
  },
  projects: {
    paths: { es: "/proyectos", en: "/en/projects" },
    titles: { es: "Proyectos de automatización, IA y software", en: "Automation, AI and software projects" },
    descriptions: { es: "Conoce el trabajo de Iván Zavala: automatizaciones y agente de ventas listos, además de proyectos de software en desarrollo y demostraciones.", en: "Explore Iván Zavala's work: completed automations and a sales agent, software projects in development, and interface demonstrations." },
  },
  websites: {
    paths: { es: "/proyectos/sitios-web", en: "/en/projects/websites" },
    titles: { es: "Sitios web y demostraciones", en: "Website portfolio and demonstrations" },
    descriptions: { es: "Una selección de sitios web y demostraciones de diseño y desarrollo de Iván Zavala.", en: "A selection of websites and design and development demonstrations by Iván Zavala." },
  },
  webapps: {
    paths: { es: "/proyectos/aplicaciones-web", en: "/en/projects/web-apps" },
    titles: { es: "Demostraciones de aplicaciones web", en: "Web application demonstrations" },
    descriptions: { es: "Demostraciones de aplicaciones web, paneles y experiencias de uso desarrolladas por Iván Zavala.", en: "Web application, dashboard and user experience demonstrations developed by Iván Zavala." },
  },
  aitools: {
    paths: { es: "/proyectos/herramientas-ia", en: "/en/projects/ai-tools" },
    titles: { es: "Herramientas de inteligencia artificial", en: "AI tools and demonstrations" },
    descriptions: { es: "Explora herramientas y demostraciones de inteligencia artificial de Iván Zavala.", en: "Explore AI tools and demonstrations by Iván Zavala." },
  },
  experiments: {
    paths: { es: "/proyectos/experimentos", en: "/en/projects/experiments" },
    titles: { es: "Experimentos de diseño e interacción", en: "Design and interaction experiments" },
    descriptions: { es: "Experimentos visuales e interactivos de Iván Zavala: interfaces, animación y componentes.", en: "Visual and interactive experiments by Iván Zavala: interfaces, animation and components." },
  },
  methodology: {
    paths: { es: "/proceso", en: "/en/process" },
    titles: { es: "Cómo trabajo: del problema a la solución", en: "How I work: from problem to launch" },
    descriptions: { es: "Un proceso directo de diagnóstico, alcance, diseño, desarrollo, pruebas y capacitación para tu proyecto de software, automatización o IA.", en: "A direct process for discovery, scope, design, development, testing and training for your software, automation or AI project." },
  },
  engagement: {
    paths: { es: "/contratacion", en: "/en/engagement" },
    titles: { es: "Contratación y alcance de los proyectos", en: "Project scope, pricing and engagement" },
    descriptions: { es: "Proyectos completos con propuesta a medida, capacitación y garantía de correcciones. Mantenimiento mensual opcional y gastos de operación definidos.", en: "Complete projects with an agreed scope, training and a bug-fix warranty. Optional monthly maintenance and clearly identified operating costs." },
  },
  about: {
    paths: { es: "/sobre-mi", en: "/en/about" },
    titles: { es: "Iván Zavala: software, automatización e IA", en: "About Iván Zavala: software, automation and AI" },
    descriptions: { es: "Conoce a Iván Zavala, consultor y desarrollador que combina software, automatización, inteligencia artificial, diseño y estrategia digital.", en: "Meet Iván Zavala, a consultant and developer combining software, automation, AI, design and digital strategy. Remote projects in English and Spanish." },
  },
  contact: {
    paths: { es: "/contacto", en: "/en/contact" },
    titles: { es: "Hablemos de tu proyecto", en: "Let's discuss your project" },
    descriptions: { es: "Cuéntame qué necesita tu negocio y qué quieres mejorar. Proyectos de automatización, agentes de IA y software a medida en español e inglés.", en: "Tell me what your business needs and what you want to improve. Automation, AI agent and custom software projects in English and Spanish." },
  },
}

export const pageIds = Object.keys(pages) as PageId[]
export const pageHref = (id: PageId, locale: Locale) => pages[id].paths[locale]

export function pageMetadata(id: PageId, locale: Locale): Metadata {
  const page = pages[id]
  const title = `${page.titles[locale]} | Iván Zavala`
  const url = siteUrl + page.paths[locale]
  return {
    title: { absolute: title },
    description: page.descriptions[locale],
    alternates: { canonical: url, languages: { es: siteUrl + page.paths.es, en: siteUrl + page.paths.en, "x-default": siteUrl + page.paths.es } },
    openGraph: { title, description: page.descriptions[locale], url, siteName: "Iván Zavala", locale: locale === "es" ? "es" : "en", alternateLocale: locale === "es" ? "en" : "es", type: "website", images: [{ url: siteUrl + "/logo-ivan-zavala.jpg", alt: "Iván Zavala" }] },
    twitter: { card: "summary", title, description: page.descriptions[locale], images: [siteUrl + "/logo-ivan-zavala.jpg"] },
  }
}
