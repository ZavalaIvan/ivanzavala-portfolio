export type DemoLocale = "es" | "en"
export type SupportTopic = "access" | "sync" | "unknown"
export type SupportRequest = { topic: SupportTopic; impact: "person" | "team"; alreadyTried: boolean }
export type KnowledgeArticle = { id: string; topic: SupportTopic; title: string; steps: string[] }
export type TicketDraft = { title: string; priority: "normal" | "high"; body: string }

export function knowledgeBase(locale: DemoLocale): KnowledgeArticle[] {
  return locale === "es" ? [
    { id: "KB-001", topic: "access", title: "Recuperar el acceso al espacio de trabajo", steps: ["Comprueba que utilizas el correo con el que recibiste la invitación.", "Solicita un enlace nuevo desde «Recuperar acceso».", "Abre el enlace más reciente en el mismo navegador."] },
    { id: "KB-002", topic: "sync", title: "Revisar una sincronización pendiente", steps: ["Comprueba el estado de la conexión en Ajustes → Integraciones.", "Revisa la fecha de la última sincronización.", "Anota el identificador del error antes de solicitar ayuda."] },
  ] : [
    { id: "KB-001", topic: "access", title: "Recover workspace access", steps: ["Check that you are using the email address that received the invitation.", "Request a new link from “Recover access”.", "Open the most recent link in the same browser."] },
    { id: "KB-002", topic: "sync", title: "Review a pending sync", steps: ["Check connection status in Settings → Integrations.", "Review the last successful sync time.", "Record the error identifier before requesting help."] },
  ]
}

// showcase:start support-automation
export function triageSupport(
  request: SupportRequest,
  articles: KnowledgeArticle[],
): { article?: KnowledgeArticle; action: "guide" | "handoff"; ticket?: TicketDraft } {
  const article = articles.find(item => item.topic === request.topic)
  const needsHuman = !article || request.impact === "team" || request.alreadyTried
  if (!needsHuman) return { article, action: "guide" }

  return {
    article,
    action: "handoff",
    ticket: {
      title: `[${request.topic}] Support review`,
      priority: request.impact === "team" ? "high" : "normal",
      body: JSON.stringify({ topic: request.topic, impact: request.impact,
        alreadyTried: request.alreadyTried, knowledgeSource: article?.id ?? null }, null, 2),
    },
  }
}
// showcase:end support-automation

export const supportScenarios = {
  access: { topic: "access", impact: "person", alreadyTried: false },
  incident: { topic: "sync", impact: "team", alreadyTried: true },
  unknown: { topic: "unknown", impact: "person", alreadyTried: false },
} as const satisfies Record<string, SupportRequest>

export type SupportScenario = keyof typeof supportScenarios
