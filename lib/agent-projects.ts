import type { Locale } from "@/lib/site"

export type AgentProjectId = "carsa" | "nora"
export type ProjectScreenshot = { src: string; alt: string; caption: string; portrait?: boolean }
type Feature = { title: string; description: string }
export type AgentProjectCopy = {
  name: string
  title: string
  category: string
  status: string
  summary: string
  problem: string
  solution: string
  coverAlt: string
  stack: string[]
  facts: { value: string; label: string }[]
  flow: string[]
  features: Feature[]
  scope: string
  screenshots: ProjectScreenshot[]
  modules?: { name: string; purpose: string; status: string }[]
}

const asset = (name: string) => `/projects/agents/${name}.webp`
export const agentCover = (id: AgentProjectId) => asset(`${id}-cover`)

export function agentProjectCopy(id: AgentProjectId, locale: Locale): AgentProjectCopy {
  const en = locale === "en"
  if (id === "carsa") return {
    name: "CARSA",
    title: en ? "From the first WhatsApp message to an organized sales enquiry" : "Del primer mensaje de WhatsApp a una oportunidad comercial organizada",
    category: en ? "Sales · Insurance · Integrations" : "Ventas · Seguros · Integraciones",
    status: en ? "Implemented · Active workflow" : "Implementado · Flujo activo",
    summary: en ? "An AI assistant that connects CARSA's customer enquiries with business knowledge and a structured lead record. Website contact buttons and Meta messaging ads provide entry points to WhatsApp." : "Un asistente de IA que conecta las consultas de CARSA con el conocimiento del negocio y un registro estructurado de prospectos. Los botones de la web y los anuncios de mensajes en Meta ofrecen puntos de entrada a WhatsApp.",
    problem: en ? "Customer enquiries arrive from different pages and campaigns. Each conversation needs relevant answers, continuity and an organized record so a human advisor can take the next step." : "Las consultas llegan desde distintas páginas y campañas. Cada conversación necesita respuestas pertinentes, continuidad y un registro ordenado para que un asesor pueda dar el siguiente paso.",
    solution: en ? "I developed an n8n workflow connected to Meta's WhatsApp Business Platform API, OpenAI, a knowledge base in Supabase and Google Sheets. Conversation handling and structured data extraction have separate responsibilities." : "Desarrollé un flujo en n8n conectado con la API de WhatsApp Business Platform de Meta, OpenAI, una base de conocimiento en Supabase y Google Sheets. La atención conversacional y la extracción de datos estructurados tienen responsabilidades separadas.",
    coverAlt: en ? "Conceptual illustration of a conversation connected to processing, knowledge and structured records" : "Ilustración conceptual de una conversación conectada con procesamiento, conocimiento y registros estructurados",
    stack: ["n8n", "WhatsApp Business Platform", "Meta API", "Google Sheets", "OpenAI", "Supabase"],
    facts: [{ value: "32", label: en ? "workflow nodes" : "nodos en el flujo" }, { value: "API", label: en ? "WhatsApp connection" : "conexión con WhatsApp" }, { value: "Sheets", label: en ? "lead and message records" : "registro de prospectos y mensajes" }],
    flow: en ? ["Website / Meta ad", "WhatsApp API", "Validation and context", "AI + knowledge base", "Reply and Sheets records"] : ["Web / anuncio de Meta", "API de WhatsApp", "Validación y contexto", "IA + base de conocimiento", "Respuesta y registro en Sheets"],
    features: en ? [
      { title: "WhatsApp through Meta's API", description: "Receives incoming messages and sends replies through WhatsApp nodes, filtering delivery callbacks and other events that should not start a conversation." },
      { title: "Business knowledge", description: "Uses semantic retrieval to bring relevant business information into the conversation and constrain answers to the available catalogue and context." },
      { title: "Conversation memory", description: "Maintains short conversation context so the assistant can follow the enquiry without treating every message as a fresh start." },
      { title: "Structured contact data", description: "A separate AI extractor and validation logic organize the information provided by the prospect before it becomes a lead record." },
      { title: "Lead qualification", description: "Separates commercial interest, service compatibility and conversation state to support human follow-up." },
      { title: "Google Sheets records", description: "Looks up and updates leads, records user messages and replies, and reads configurable blocked-contact and unsupported-service lists." },
      { title: "Human handoff", description: "Collects the relevant contact preferences and enquiry context for an advisor, without promising a confirmed appointment when no calendar confirmation exists." },
      { title: "Controlled replies and fallback", description: "Combines deterministic rules with the conversational model, respects closed conversations and provides a fallback route if the agent fails." },
    ] : [
      { title: "WhatsApp mediante la API de Meta", description: "Recibe mensajes y envía respuestas mediante nodos de WhatsApp. Filtra los avisos de entrega y otros eventos que no deben iniciar una conversación." },
      { title: "Conocimiento del negocio", description: "Utiliza búsqueda semántica para aportar información pertinente y orientar las respuestas con el catálogo y el contexto disponibles." },
      { title: "Memoria de conversación", description: "Conserva contexto reciente para seguir la consulta sin tratar cada mensaje como una conversación nueva." },
      { title: "Datos de contacto estructurados", description: "Un extractor de IA separado y reglas de validación organizan los datos proporcionados por el prospecto antes de incorporarlos al registro." },
      { title: "Calificación de prospectos", description: "Distingue el interés comercial, la compatibilidad del servicio y el estado de la conversación para apoyar el seguimiento humano." },
      { title: "Registros en Google Sheets", description: "Consulta y actualiza prospectos, registra mensajes y respuestas, y lee listas configurables de contactos bloqueados y servicios no ofrecidos." },
      { title: "Derivación a un asesor", description: "Recopila las preferencias de contacto y el contexto de la consulta para un asesor, sin prometer una cita confirmada cuando no existe confirmación de calendario." },
      { title: "Respuestas controladas y recuperación", description: "Combina reglas deterministas con el modelo conversacional, respeta el cierre de conversaciones y contempla una respuesta alternativa si el agente falla." },
    ],
    scope: en ? "The case study documents the implemented workflow. The ad is shown as a creative preview, not as proof that the campaign is currently delivering. The assistant supports initial enquiries and human follow-up; it does not issue insurance policies or confirm calendar appointments." : "El caso documenta el flujo implementado. El anuncio se muestra como vista previa de la pieza, no como evidencia de una campaña actualmente en circulación. El agente apoya la atención inicial y el seguimiento humano; no emite pólizas ni confirma citas de calendario.",
    screenshots: [
      { src: asset("carsa-workflow"), alt: en ? "Real CARSA n8n workflow with WhatsApp, validation, AI and Google Sheets nodes" : "Flujo real de CARSA en n8n con nodos de WhatsApp, validación, IA y Google Sheets", caption: en ? "Real n8n editor capture: the implemented conversation and lead-management workflow." : "Captura real del editor de n8n: flujo implementado de atención y gestión de prospectos." },
      { src: asset("carsa-web-contact"), alt: en ? "CARSA website with its contact and floating WhatsApp buttons" : "Sitio de CARSA con los botones de contacto y WhatsApp flotante", caption: en ? "Real website capture. The WhatsApp entry link includes page and button context in the prepared message." : "Captura real de la web. El acceso a WhatsApp incorpora contexto de la página y del botón en el mensaje preparado." },
      { src: asset("carsa-meta-whatsapp"), alt: en ? "Real Meta ad preview for CARSA with a WhatsApp call-to-action button" : "Vista previa real de un anuncio de CARSA en Meta con botón de WhatsApp", caption: en ? "Real Meta creative preview with the WhatsApp button. Campaign performance is not represented." : "Vista previa real de la pieza en Meta con su botón de WhatsApp. No representa resultados de campaña.", portrait: true },
    ],
  }
  return {
    name: "NORA",
    title: en ? "A personal and work assistant with memory, tools and human approval" : "Un asistente personal y laboral con memoria, herramientas y aprobación humana",
    category: en ? "Productivity · Orchestration · Personal system" : "Productividad · Orquestación · Sistema propio",
    status: en ? "Own project · Evolving system" : "Proyecto propio · En evolución",
    summary: en ? "NORA brings scheduling, tasks, information and follow-up into an assistant architecture. Behind the chat are specialized workflows, persistent records and an approval engine for actions that require human control." : "NORA reúne agenda, tareas, información y seguimiento en una arquitectura de asistencia. Detrás del chat hay flujos especializados, registros persistentes y un motor de permisos para las acciones que necesitan control humano.",
    problem: en ? "Personal and work information is spread across messages, email, calendars and project notes. A useful assistant needs to preserve context, organize records and know when to ask before acting." : "La información personal y de trabajo se reparte entre mensajes, correos, calendarios y notas de proyectos. Un asistente útil necesita conservar contexto, organizar registros y saber cuándo pedir autorización antes de actuar.",
    solution: en ? "I designed NORA as a modular system in n8n with a central chat, a specialist-agent architecture, Supabase persistence, Gmail and Google Calendar integrations, and separate workflows for input, summaries, automation proposals and error handling." : "Diseñé NORA como un sistema modular en n8n con chat central, una arquitectura de agentes especializados, persistencia en Supabase, integraciones con Gmail y Google Calendar y flujos separados para recepción, resúmenes, propuestas de automatización y registro de errores.",
    coverAlt: en ? "Conceptual illustration of a coordination core connected to modules for memory, calendar, tasks and approvals" : "Ilustración conceptual de un núcleo coordinador conectado con módulos de memoria, agenda, tareas y autorizaciones",
    stack: ["n8n", "OpenAI", "Supabase", "Gmail", "Google Calendar", "Make", "WhatsApp"],
    facts: [{ value: "9", label: en ? "developed workflows" : "flujos desarrollados" }, { value: "75", label: en ? "nodes in the central chat" : "nodos en el chat central" }, { value: "7", label: en ? "specialists in the core design" : "especialistas en el diseño del núcleo" }],
    flow: en ? ["Chat / authorized input", "Context and memory", "Tools and specialists", "Permission check", "Action, record and follow-up"] : ["Chat / entrada autorizada", "Contexto y memoria", "Herramientas y especialistas", "Verificación de permisos", "Acción, registro y seguimiento"],
    features: en ? [
      { title: "Central chat and orchestration", description: "A shared assistant interface with tools and context. The core design separates finance, scheduling, projects and tasks, communications, personal life, reports and coordination into seven specialist roles." },
      { title: "Memory and context", description: "Recent conversation context, persistent facts, behaviour patterns and learned profiles that can be reviewed and corrected by the owner." },
      { title: "Scheduling with approval", description: "Reads the calendar and routes proposed event creation, changes and cancellations through authorization and validation before execution." },
      { title: "Tasks and projects", description: "Records proposed tasks, queries priorities and organizes projects and organizations. Controlled changes are routed through the permission engine." },
      { title: "Email and drafts", description: "Searches authorized email, prepares Gmail drafts and separates preparation from sending an approved message." },
      { title: "Financial records", description: "Registers income and expenses, imports eligible notifications from authorized email, checks for duplicates and produces summaries. It does not execute bank transfers or payments." },
      { title: "Audio, images and documents", description: "Dedicated gateway branches for audio transcription and image/document analysis, with previous integration tests covering audio, images, PDF and text." },
      { title: "Activity and wellbeing", description: "An activity timeline and tools for recording and reviewing habits, sleep and meals alongside daily summaries." },
      { title: "Contacts and relationship context", description: "Connects contact context, organizations, projects and documents. The WhatsApp observer collects context for private review rather than automatically replying to third parties." },
      { title: "Proactive summaries", description: "A separate workflow prepares and stores morning, end-of-day and weekly briefs. External delivery depends on the configured channel." },
      { title: "Supervised automation builder", description: "Builds inactive workflow drafts from approved, restricted blueprints. Activation remains a separate supervised step." },
      { title: "Permissions and traceability", description: "Validates approved actions, records outcomes and failures, and includes an error-handler workflow. The design accounts for repeated requests and incomplete actions." },
      { title: "Additional prepared modules", description: "The dashboard, technical monitor and location receiver have their own workflows. These three workflows were inactive in the reviewed snapshot." },
    ] : [
      { title: "Chat central y orquestación", description: "Una interfaz de asistencia con herramientas y contexto. El diseño del núcleo separa finanzas, agenda, proyectos y tareas, comunicaciones, vida personal, reportes y coordinación en siete roles especializados." },
      { title: "Memoria y contexto", description: "Contexto reciente de conversación, hechos persistentes, patrones y perfiles aprendidos que el propietario puede revisar y corregir." },
      { title: "Agenda con aprobación", description: "Consulta el calendario y dirige la creación, modificación y cancelación de eventos mediante autorización y validación antes de ejecutar." },
      { title: "Tareas y proyectos", description: "Registra tareas propuestas, consulta prioridades y organiza proyectos y organizaciones. Los cambios controlados pasan por el motor de permisos." },
      { title: "Correos y borradores", description: "Consulta correos autorizados, prepara borradores en Gmail y separa la preparación del envío de un mensaje aprobado." },
      { title: "Registros financieros", description: "Registra ingresos y gastos, importa notificaciones válidas desde correos autorizados, busca duplicados y prepara resúmenes. No ejecuta transferencias bancarias ni pagos." },
      { title: "Audios, imágenes y documentos", description: "El gateway tiene rutas para transcribir audio y analizar imágenes y documentos, con pruebas de integración previas que cubrieron audio, imágenes, PDF y texto." },
      { title: "Actividad y bienestar", description: "Una bitácora de actividades y herramientas para registrar y consultar hábitos, sueño y comidas, junto con resúmenes diarios." },
      { title: "Contactos y contexto de relaciones", description: "Relaciona contactos, organizaciones, proyectos y documentos. El observador de WhatsApp recopila contexto para revisión privada y no responde automáticamente a terceros." },
      { title: "Resúmenes proactivos", description: "Un flujo independiente prepara y guarda resúmenes de mañana, cierre del día y revisión semanal. La entrega externa depende del canal configurado." },
      { title: "Constructor supervisado de automatizaciones", description: "Crea borradores inactivos de flujos a partir de plantillas restringidas y aprobadas. La activación continúa como un paso supervisado independiente." },
      { title: "Permisos y trazabilidad", description: "Valida las acciones aprobadas, registra resultados y fallos e incluye un flujo de manejo de errores. El diseño contempla solicitudes repetidas y acciones incompletas." },
      { title: "Módulos adicionales preparados", description: "El panel de consulta, el monitor técnico y el receptor de ubicación tienen flujos propios. Estos tres flujos estaban inactivos en la versión revisada." },
    ],
    scope: en ? "An evolving personal project with active and inactive modules. The screenshots document the architecture, not a guarantee that every integration is operating end to end. The current WhatsApp observer is passive; automatic replies to third parties are not part of that mode. No private conversations, financial records or credentials are shown." : "Proyecto propio en evolución, con módulos activos e inactivos. Las capturas documentan la arquitectura y no garantizan que todas las integraciones estén operando de extremo a extremo. El observador actual de WhatsApp es pasivo; las respuestas automáticas a terceros no forman parte de ese modo. No se muestran conversaciones privadas, movimientos financieros ni credenciales.",
    screenshots: [
      { src: asset("nora-chat-workflow"), alt: en ? "Real NORA Chat n8n workflow with its approval routes and connected tools" : "Flujo real NORA Chat en n8n con rutas de aprobación y herramientas conectadas", caption: en ? "Real capture: the central chat and its 75 nodes, including tools, context and permission routes." : "Captura real: chat central y sus 75 nodos, con herramientas, contexto y rutas de permisos." },
      { src: asset("nora-core-workflow"), alt: en ? "Real NORA Core workflow with specialist agents, memory, routing and execution controls" : "Flujo real NORA Core con agentes especializados, memoria, enrutamiento y controles de ejecución", caption: en ? "Real capture: the core's specialist architecture, memory and controlled action routing. Some branches remain disabled." : "Captura real: arquitectura de especialistas del núcleo, memoria y enrutamiento controlado de acciones. Algunas ramas permanecen desactivadas." },
    ],
    modules: (en ? [
      ["Chat", "Conversation, tools and permissions", "Active"], ["Core", "Specialist design, memory and financial ingestion", "Active; some branches disabled"], ["WhatsApp Gateway", "Authorized input and passive context collection", "Active · Passive observer"], ["Proactive Briefs", "Stored morning, daily and weekly summaries", "Active"], ["Automation Builder", "Restricted, inactive workflow drafts", "Active · Supervised"], ["Error Handler", "Error records for review", "Active"], ["Technical Monitor", "Checks for authorized technical targets", "Inactive"], ["Location Ingest", "Authorized location-event receiver", "Inactive"], ["Dashboard", "Read-only overview", "Inactive"],
    ] : [
      ["Chat", "Conversación, herramientas y permisos", "Activo"], ["Core", "Diseño de especialistas, memoria e ingesta financiera", "Activo; algunas ramas desactivadas"], ["WhatsApp Gateway", "Entrada autorizada y recopilación pasiva de contexto", "Activo · Observador pasivo"], ["Proactive Briefs", "Resúmenes guardados de mañana, día y semana", "Activo"], ["Automation Builder", "Borradores restringidos e inactivos de flujos", "Activo · Supervisado"], ["Error Handler", "Registro de errores para revisión", "Activo"], ["Technical Monitor", "Comprobaciones de objetivos técnicos autorizados", "Inactivo"], ["Location Ingest", "Recepción autorizada de eventos de ubicación", "Inactivo"], ["Dashboard", "Panel de consulta", "Inactivo"],
    ]).map(([name, purpose, status]) => ({ name, purpose, status })),
  }
}
