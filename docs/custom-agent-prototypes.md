# NEXO y TURNO: prototipos documentados

Fecha: 21 de octubre de 2026.

## Objetivo y alcance

Mostrar cómo Iván Zavala puede desarrollar herramientas de soporte y reservas con código a medida. El usuario pidió prototipos sencillos para documentar la interfaz, la automatización y las conexiones; no se requiere completar ni operar ambos productos.

Las demostraciones usan escenarios guiados y reglas TypeScript. No realizan inferencia de IA, no tienen un modelo conectado y no solicitan datos personales. El estado dura hasta reiniciar o recargar la vista. No hay endpoints públicos que envíen tickets, creen citas reales o llamen a modelos.

## NEXO: soporte técnico

- Escenarios: recuperación de acceso, incidencia del equipo y tema sin documentación.
- Base local de dos artículos con referencia de origen.
- Diagnóstico sobre entradas estructuradas; estas provienen del escenario, no de un clasificador de IA.
- Reglas de derivación por impacto, comprobaciones previas y falta de documentación.
- Borrador de ticket con tema, impacto, pasos previos y referencia. El botón prepara una vista de ejemplo, sin enviar a GitHub.
- Adaptador de servidor documentado para GitHub Issues REST. Usa un proveedor de token inyectado, versión de API `2026-03-10`, tiempo límite y comprobación de respuesta HTTP. Está desconectado de las demos.
- Contratos de herramientas en JSON Schema para una futura integración con un modelo, independientes de un proveedor.

## TURNO: reservas y citas

- Fechas fijas de demostración: 9, 10 y 11 de noviembre de 2026; no son disponibilidad comercial real.
- Servicios de 30 y 60 minutos, horario de 09:00 a 15:00 y margen de 15 minutos.
- Un bloque ocupado de 10:00 a 11:00 y reservas locales afectan los horarios ofrecidos.
- Confirmación explícita y revalidación del horario. Un intervalo ya reservado queda bloqueado en esa vista.
- Estado en memoria del componente: sin almacenamiento duradero, sincronización entre visitantes ni protección de concurrencia distribuida.
- Adaptadores de servidor para Google Calendar v3: `freeBusy` y `events.insert`. Zona horaria explícita, autorización inyectada, tiempos límite, validación de respuesta y un ID de evento estable suministrado por el llamante. Están desconectados de las demos.
- La gestión de OAuth y renovación de tokens, persistencia, reservas simultáneas, confirmaciones externas, cambios, cancelaciones y recordatorios quedan para una implementación de cliente.

## Archivos y documentación pública

- `lib/agent-prototypes/support.ts`: datos y reglas del soporte.
- `lib/agent-prototypes/booking.ts`: reglas de disponibilidad y confirmación.
- `lib/agent-prototypes/connectors.ts`: ejemplos de adaptadores HTTP de servidor.
- `lib/agent-prototypes/tool-contracts.ts`: contratos para conectar herramientas a un modelo.
- `lib/prototype-source.ts`: extrae exclusivamente secciones marcadas de cuatro archivos públicos al compilar. Nunca acepta rutas del visitante ni lee archivos de entorno.
- `components/agent-prototypes/`: interfaces y explorador de código.
- Páginas bilingües de documentación bajo `/proyectos/agentes-ia/` y `/en/projects/ai-agents/`.
- Vistas completas bajo `/demos/` y `/en/demos/`, con `noindex` y enlace a su documentación canónica.

El código mostrado en el portafolio es texto seleccionable, con copia y enlaces al archivo completo en GitHub. Cada fragmento identifica su estado: regla ejecutada, contrato de modelo sin conexión o adaptador sin conexión activa. Las capturas muestran la interfaz implementada con datos de prueba.

## Referencias primarias revisadas

- GitHub Issues: https://docs.github.com/en/rest/issues/issues#create-an-issue
- Google Calendar freeBusy: https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query
- Google Calendar events.insert: https://developers.google.com/workspace/calendar/api/v3/reference/events/insert

## Paso a una solución operativa

Conectar el modelo y las cuentas autorizadas del cliente, incorporar datos reales y persistencia, definir permisos, proteger las operaciones, agregar supervisión y evaluar con casos del negocio. Ninguna captura o demo se presenta como prueba de esas conexiones activas.
