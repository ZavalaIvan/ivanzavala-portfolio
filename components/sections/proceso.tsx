import Link from "next/link"
import { pageHref, type Locale } from "@/lib/site"
import { cardClass, CheckList, ContactCta, SectionHeading } from "@/components/section-ui"

export function MetodologiaSection({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const steps = en ? [
    ["Understand the problem", "We review your operation, the tools you use and what you want to improve. We identify users, constraints and priorities."],
    ["Agree on the scope", "You receive a proposal with deliverables, stages, investment and terms. We define what a successful delivery needs to do."],
    ["Design the solution", "We map the workflow or interface and review the approach before developing the system."],
    ["Build and review", "I implement the solution and share progress so we can resolve questions and validate the agreed functions."],
    ["Test and launch", "We test the main use cases and integrations before putting the solution into operation."],
    ["Train and hand over", "Your team receives training. The bug-fix warranty follows the proposal, and monthly maintenance is available separately."],
  ] : [
    ["Entender el problema", "Revisamos tu operación, las herramientas que utilizas y qué quieres mejorar. Identificamos usuarios, limitaciones y prioridades."],
    ["Acordar el alcance", "Recibes una propuesta con entregables, etapas, inversión y condiciones. Definimos qué debe hacer la solución al entregarse."],
    ["Diseñar la solución", "Planteamos el flujo de trabajo o la interfaz y revisamos el enfoque antes de desarrollar el sistema."],
    ["Desarrollar y revisar", "Implemento la solución y comparto avances para resolver dudas y validar las funciones acordadas."],
    ["Probar y publicar", "Comprobamos los casos de uso principales y las integraciones antes de poner la solución en marcha."],
    ["Capacitar y entregar", "Tu equipo recibe capacitación. La garantía de correcciones se rige por la propuesta y el mantenimiento mensual se contrata aparte."],
  ]
  return <div className="flex flex-col gap-10 py-6"><SectionHeading label={en ? "Working together" : "Cómo trabajamos"} title={en ? "From the problem to a working solution" : "Del problema a una solución funcional"} description={en ? "A direct process with clear deliverables and shared decisions throughout your software, automation or AI project." : "Un proceso directo, con entregables claros y decisiones compartidas durante tu proyecto de software, automatización o IA."} /><ol className="flex flex-col gap-4">{steps.map(([title, description], index) => <li key={title} className={`${cardClass} flex gap-4`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-mono">{String(index + 1).padStart(2, "0")}</span><div className="flex flex-col gap-2"><h2 className="text-base font-semibold">{title}</h2><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></div></li>)}</ol><Link href={pageHref("engagement", locale)} className="text-sm underline underline-offset-4">{en ? "Understand project scope and pricing" : "Conoce el alcance y la contratación"}</Link><ContactCta locale={locale} /></div>
}

export function PreciosSection({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const includes = en ? ["Agreed functions and deliverables", "Planning, design and implementation within scope", "Testing and deployment of the solution", "Training for your team", "Bug-fix warranty under the proposal", "Direct communication during the project"] : ["Funciones y entregables acordados", "Planeación, diseño e implementación dentro del alcance", "Pruebas y puesta en marcha de la solución", "Capacitación para tu equipo", "Garantía de correcciones según la propuesta", "Comunicación directa durante el proyecto"]
  const questions = en ? [
    ["How is the investment defined?", "I review the problem, functions, systems, data and integration requirements. The proposal states the investment and stages for the agreed scope."],
    ["What operating costs should I consider?", "The proposal identifies applicable hosting, licenses, AI usage and external services. These recurring costs are distinguished from development."],
    ["What does the warranty cover?", "Functional corrections within the delivered scope, under the period and conditions stated in the proposal. New functions or changes are quoted separately."],
    ["Is monthly maintenance required?", "Maintenance is offered separately with its own scope and cost. We identify what ongoing care your solution needs so you can plan for it."],
  ] : [
    ["¿Cómo se define la inversión?", "Reviso el problema, las funciones, los sistemas, los datos y las integraciones necesarias. La propuesta establece la inversión y las etapas del alcance acordado."],
    ["¿Qué gastos de operación debo considerar?", "La propuesta identifica el hosting, las licencias, el consumo de IA y los servicios externos que correspondan. Estos gastos recurrentes se distinguen del desarrollo."],
    ["¿Qué cubre la garantía?", "Correcciones de funcionamiento dentro del alcance entregado, con el periodo y las condiciones indicados en la propuesta. Las funciones nuevas y los cambios se cotizan aparte."],
    ["¿El mantenimiento mensual es obligatorio?", "El mantenimiento se ofrece por separado, con alcance y costo propios. Identificamos qué cuidados necesita la solución para que puedas planear su continuidad."],
  ]
  return <div className="flex flex-col gap-10 py-6"><SectionHeading label={en ? "Working together" : "Cómo trabajamos"} title={en ? "Complete projects with a clear scope" : "Proyectos completos con un alcance claro"} description={en ? "A proposal tailored to what your business needs, with defined deliverables, investment and terms before development starts." : "Una propuesta adaptada a lo que necesita tu negocio, con entregables, inversión y condiciones definidos antes de comenzar el desarrollo."} /><section className="flex flex-col gap-4"><h2 className="text-xl font-semibold">{en ? "What's included" : "Qué incluye el proyecto"}</h2><CheckList items={includes} /></section><section className={`${cardClass} flex flex-col gap-3`}><h2 className="text-xl font-semibold">{en ? "Optional monthly maintenance" : "Mantenimiento mensual opcional"}</h2><p className="text-sm leading-relaxed text-muted-foreground">{en ? "An additional service for reviews, updates and ongoing support. The plan defines responsibilities, coverage and response terms. It does not replace the project's bug-fix warranty." : "Un servicio adicional para revisiones, actualizaciones y soporte continuo. El plan define responsabilidades, cobertura y condiciones de atención. Se distingue de la garantía de correcciones del proyecto."}</p><Link href={pageHref("support", locale)} className="text-sm underline underline-offset-4">{en ? "Explore maintenance" : "Conoce el mantenimiento"}</Link></section><section className="flex flex-col gap-3"><h2 className="text-xl font-semibold">{en ? "Before we start" : "Antes de comenzar"}</h2>{questions.map(([question, answer]) => <details key={question} className={cardClass}><summary className="cursor-pointer text-sm font-semibold">{question}</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}</section><ContactCta locale={locale} /></div>
}
