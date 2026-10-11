import type { Locale } from "./site"

export type ServiceId = "automation" | "ai" | "software" | "support"
type ServiceCopy = {
  title: string
  description: string
  features: string[]
  examples: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

const services: Record<Locale, Record<ServiceId, ServiceCopy>> = {
  es: {
    automation: {
      title: "Automatización de procesos para empresas",
      description: "Cuando tu equipo repite tareas o copia información entre herramientas, la operación pierde fluidez. Diseño e implemento automatizaciones que conectan tus sistemas y reducen trabajo manual, con un proceso y un alcance claros.",
      features: ["Análisis del proceso y de las tareas que conviene automatizar", "Integración de herramientas, APIs y bases de datos", "Sincronización de información entre sistemas", "Flujos de trabajo con reglas y validaciones", "Pruebas de funcionamiento y tratamiento de errores", "Documentación y capacitación para utilizar la solución"],
      examples: [
        { title: "Información conectada", description: "Conectar formularios, plataformas comerciales y sistemas internos para que la información llegue al lugar correcto." },
        { title: "Reportes y tareas administrativas", description: "Organizar datos y preparar reportes recurrentes a partir de las herramientas que utiliza tu equipo." },
        { title: "Seguimiento comercial", description: "Registrar oportunidades, avisar al responsable y activar el siguiente paso del proceso según reglas acordadas." },
      ],
      faqs: [
        { question: "¿Cómo sé qué proceso conviene automatizar?", answer: "Revisamos qué se repite, cuánto trabajo requiere y qué problemas genera. A partir de eso definimos prioridades y comprobamos si las herramientas disponibles permiten implementar la solución." },
        { question: "¿Se pueden conectar las herramientas que ya utilizo?", answer: "Evaluamos sus APIs, permisos y opciones de integración. La propuesta identifica qué se puede conectar, qué accesos se necesitan y qué limitaciones existen." },
        { question: "¿Toda automatización necesita inteligencia artificial?", answer: "La IA se incorpora cuando aporta utilidad, por ejemplo para interpretar texto o clasificar información. Los pasos que solo necesitan reglas pueden resolverse con una automatización convencional." },
        { question: "¿Qué pasa después de la entrega?", answer: "Incluyo capacitación y garantía de correcciones según las condiciones acordadas. Puedes contratar mantenimiento mensual para revisiones, actualizaciones y soporte con un alcance definido." },
      ],
    },
    ai: {
      title: "Agentes de inteligencia artificial para empresas",
      description: "Desarrollo agentes de IA adaptados a la información y los procesos de tu negocio. Pueden apoyar la atención, las ventas y el trabajo interno, conectándose con tus herramientas para realizar las tareas que definamos en el proyecto.",
      features: ["Definición de la tarea, el canal y los límites del agente", "Base de conocimiento con información del negocio", "Contexto de conversación y registro de datos según el alcance", "Integración con sistemas y herramientas disponibles", "Reglas de atención y derivación a una persona", "Pruebas con casos de uso, capacitación y puesta en marcha"],
      examples: [
        { title: "Agentes de ventas por WhatsApp", description: "Orientar consultas, recopilar información del prospecto y apoyar el seguimiento con el contexto de tu oferta." },
        { title: "Atención al cliente", description: "Responder preguntas frecuentes a partir de información del negocio y dirigir los casos que necesitan atención personal." },
        { title: "Asistentes para tu equipo", description: "Consultar información, organizar solicitudes o apoyar tareas internas mediante las integraciones acordadas." },
      ],
      faqs: [
        { question: "¿Qué diferencia hay entre un agente de IA y un chatbot?", answer: "Un chatbot puede limitarse a responder mensajes. Un agente también puede utilizar herramientas y realizar acciones dentro de un proceso. Definimos lo que necesitas antes de elegir la solución." },
        { question: "¿Cómo utiliza la información de mi negocio?", answer: "Definimos las fuentes que puede consultar, cómo se actualizarán y qué puede responder o hacer. La memoria, los datos registrados y las integraciones forman parte del alcance de la propuesta." },
        { question: "¿Puede trabajar con WhatsApp y mi sistema comercial?", answer: "Evaluamos las opciones de integración del canal y de tus sistemas. La propuesta detalla las funciones disponibles, los accesos necesarios y los costos de servicios externos." },
        { question: "¿Qué ocurre cuando no puede resolver una consulta?", answer: "Diseñamos reglas para reconocer límites, registrar el contexto y derivar el caso a una persona cuando corresponda. Estas situaciones se incluyen en las pruebas del proyecto." },
        { question: "¿Cuánto cuesta desarrollar y operar un agente?", answer: "La inversión depende de las tareas, los canales y las integraciones. La cotización separa el desarrollo de gastos de operación como consumo de IA, infraestructura y servicios externos. El mantenimiento mensual es opcional y tiene costo adicional." },
      ],
    },
    software: {
      title: "Software a medida y aplicaciones web",
      description: "Si tu operación necesita algo que las herramientas actuales no resuelven, construyo un sistema adaptado a tu negocio. Combino planeación, diseño y desarrollo para crear aplicaciones web que tu equipo o tus clientes puedan utilizar.",
      features: ["Definición de usuarios, funciones y alcance del proyecto", "Diseño de pantallas y experiencia de uso", "Desarrollo de la aplicación y de su lógica de negocio", "Roles, permisos e integraciones según las necesidades", "Pruebas, publicación y documentación", "Capacitación y garantía de correcciones según la propuesta"],
      examples: [
        { title: "Sistemas internos", description: "Centralizar tareas, registros y seguimiento en una aplicación diseñada para la operación de tu equipo." },
        { title: "Portales y plataformas", description: "Crear espacios para clientes o colaboradores con funciones, información y permisos definidos." },
        { title: "Comercio electrónico propio", description: "Desarrollar una tienda adaptada a tu catálogo y tus procesos, considerando pagos, operación y mantenimiento." },
      ],
      faqs: [
        { question: "¿Necesito software a medida o una herramienta existente?", answer: "Primero revisamos el problema y las opciones disponibles. Podemos integrar o adaptar herramientas existentes, desarrollar un sistema propio o combinar ambas posibilidades." },
        { question: "¿Una aplicación web es lo mismo que un sitio web?", answer: "Un sitio presenta información sobre tu negocio. Una aplicación web permite realizar tareas, gestionar datos o interactuar con un sistema desde el navegador. El proyecto se define por lo que sus usuarios necesitan hacer." },
        { question: "¿Cuánto cuesta y cuánto tarda un proyecto?", answer: "Depende de las funciones, los usuarios, los datos y las integraciones. Después de definir el alcance recibes una propuesta con entregables, inversión, etapas y condiciones. No hay un precio ni un plazo único para todos los proyectos." },
        { question: "¿Puedo ampliar el sistema después?", answer: "Podemos plantear una primera entrega con prioridades claras y cotizar nuevas funciones por separado. La propuesta distingue las correcciones del alcance original de las mejoras posteriores." },
      ],
    },
    support: {
      title: "Mantenimiento de software, automatizaciones y agentes de IA",
      description: "Acompañamiento mensual para revisar la solución, atender incidencias y mantener sus componentes. Definimos qué se incluye y cómo se dará seguimiento, de acuerdo con las necesidades de tu operación.",
      features: ["Revisiones preventivas de la solución", "Actualización de componentes y dependencias según el plan", "Seguimiento de incidencias y correcciones", "Revisión de integraciones y servicios externos", "Monitoreo y soporte con condiciones acordadas", "Propuestas de mejora y evolución del sistema"],
      examples: [
        { title: "Software y aplicaciones web", description: "Revisar el funcionamiento de la aplicación y atender incidencias dentro del plan contratado." },
        { title: "Automatizaciones e integraciones", description: "Dar seguimiento a flujos y conexiones cuando cambien las herramientas o los procesos." },
        { title: "Agentes de IA", description: "Revisar información, respuestas e integraciones y ajustar la solución conforme al alcance acordado." },
      ],
      faqs: [
        { question: "¿El mantenimiento está incluido en el proyecto?", answer: "El proyecto incluye capacitación y garantía de correcciones según la propuesta. El mantenimiento mensual es un servicio adicional con costo y alcance propios." },
        { question: "¿Qué cubre la garantía de correcciones?", answer: "Cubre las correcciones de funcionamiento del alcance entregado bajo las condiciones y el periodo establecidos en la propuesta. Las funciones nuevas y los cambios de alcance se cotizan por separado." },
        { question: "¿Puedo solicitar mantenimiento para un sistema existente?", answer: "Primero reviso su estado, documentación, accesos y componentes. Con esa información podemos definir si el acompañamiento es viable y qué debe incluir el plan." },
      ],
    },
  },
  en: {
    automation: {
      title: "Business process and AI workflow automation",
      description: "When your team repeats tasks or copies information between tools, operations become harder to manage. I design and implement automations that connect your systems and reduce manual work, with a clear process and scope.",
      features: ["Review of the process and tasks worth automating", "Tool, API and database integrations", "Data synchronization between systems", "Workflows with agreed rules and validation", "Functional testing and error handling", "Documentation and training to use the solution"],
      examples: [
        { title: "Connected information", description: "Connect forms, commercial platforms and internal systems so information reaches the right place." },
        { title: "Reports and administration", description: "Organize data and prepare recurring reports from the tools your team already uses." },
        { title: "Sales follow-up", description: "Record opportunities, notify the responsible person and trigger the next step according to agreed rules." },
      ],
      faqs: [
        { question: "How do I know what to automate first?", answer: "We review repetitive tasks, the work they require and the problems they create. Then we set priorities and check whether the available tools support the solution." },
        { question: "Can you connect the tools I already use?", answer: "We evaluate their APIs, permissions and integration options. The proposal identifies what can be connected, the access needed and any limitations." },
        { question: "Does every automation need AI?", answer: "AI is used where it adds value, such as interpreting text or classifying information. Steps that only require rules can use conventional automation." },
        { question: "What happens after handover?", answer: "Training and a bug-fix warranty are included under the agreed terms. You can arrange optional monthly maintenance for reviews, updates and support with a defined scope." },
      ],
    },
    ai: {
      title: "Custom AI agent development services",
      description: "I develop AI agents tailored to your business information and processes. They can support customers, sales and internal work, connecting with your tools to perform the tasks we define for the project.",
      features: ["Definition of the agent's task, channel and boundaries", "A knowledge base with your business information", "Conversation context and data recording within the agreed scope", "Integration with available systems and tools", "Response rules and handover to a person", "Use-case testing, training and launch"],
      examples: [
        { title: "WhatsApp sales agents", description: "Guide inquiries, collect prospect information and support follow-up using the context of your offering." },
        { title: "Customer support", description: "Answer recurring questions using business information and route cases that need personal attention." },
        { title: "Internal assistants", description: "Find information, organize requests or support internal tasks through the integrations we agree on." },
      ],
      faqs: [
        { question: "How is an AI agent different from a chatbot?", answer: "A chatbot may only respond to messages. An agent can also use tools and take actions within a process. We define your needs before choosing the solution." },
        { question: "How does it use my business information?", answer: "We define the sources it can consult, how they will be updated and what it can say or do. Memory, recorded data and integrations are part of the proposal's scope." },
        { question: "Can it work with WhatsApp and my sales system?", answer: "We evaluate the integration options for the channel and your systems. The proposal details available functions, required access and external service costs." },
        { question: "What happens when it cannot resolve a request?", answer: "We design rules to recognize boundaries, record context and hand the case over to a person when needed. These scenarios are included in project testing." },
        { question: "How much does an agent cost to build and operate?", answer: "The investment depends on tasks, channels and integrations. The quote separates development from operating costs such as AI usage, infrastructure and external services. Optional monthly maintenance is charged separately." },
      ],
    },
    software: {
      title: "Custom software and web application development",
      description: "When existing tools do not meet your operational needs, I build a system around your business. I combine planning, design and development to create web applications your team or customers can use.",
      features: ["Definition of users, functions and project scope", "Interface and user experience design", "Application and business logic development", "Roles, permissions and integrations as required", "Testing, deployment and documentation", "Training and a bug-fix warranty under the proposal"],
      examples: [
        { title: "Internal systems", description: "Centralize tasks, records and follow-up in an application designed around your team's operation." },
        { title: "Portals and platforms", description: "Create spaces for customers or collaborators with clearly defined functions, information and access." },
        { title: "Custom ecommerce", description: "Build a store around your catalog and processes, accounting for payments, operations and maintenance." },
      ],
      faqs: [
        { question: "Do I need custom software or an existing tool?", answer: "We first review the problem and available options. We can integrate or adapt existing tools, develop a custom system or combine both approaches." },
        { question: "Is a web application the same as a website?", answer: "A website presents information about your business. A web application lets users perform tasks, manage data or interact with a system in their browser. The project starts with what users need to do." },
        { question: "How much will it cost and how long will it take?", answer: "That depends on functions, users, data and integrations. Once we define the scope, you receive a proposal with deliverables, investment, stages and terms. There is no single price or timeline for every project." },
        { question: "Can I extend the system later?", answer: "We can plan an initial delivery with clear priorities and quote additional functions separately. The proposal distinguishes fixes to the original scope from later enhancements." },
      ],
    },
    support: {
      title: "Software, automation and AI agent maintenance",
      description: "Monthly support to review your solution, address incidents and maintain its components. We define the scope and follow-up process around your operational needs.",
      features: ["Preventive reviews of the solution", "Component and dependency updates under the plan", "Incident follow-up and corrections", "Integration and external service reviews", "Monitoring and support under agreed terms", "Recommendations for system improvements"],
      examples: [
        { title: "Software and web applications", description: "Review application behavior and address incidents within the maintenance plan." },
        { title: "Automations and integrations", description: "Follow up on workflows and connections as tools or processes change." },
        { title: "AI agents", description: "Review information, responses and integrations and adjust the solution within the agreed scope." },
      ],
      faqs: [
        { question: "Is maintenance included in the project?", answer: "The project includes training and a bug-fix warranty under the proposal. Monthly maintenance is an additional service with its own cost and scope." },
        { question: "What does the bug-fix warranty cover?", answer: "It covers functional corrections within the delivered scope, under the terms and period defined in the proposal. New functions and scope changes are quoted separately." },
        { question: "Can you maintain an existing system?", answer: "I first review its condition, documentation, access and components. We can then determine whether maintenance is viable and what the plan should include." },
      ],
    },
  },
}

export const serviceCopy = (id: ServiceId, locale: Locale) => services[locale][id]
