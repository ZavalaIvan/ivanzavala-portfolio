# Casos de agentes IA: fuentes y criterios editoriales

Revisión: 21 de octubre de 2026.

## Evidencia consultada

- Conversación de Codex «Listar workflows de n8n»: evolución inicial de CARSA y NORA.
- Conversación de Codex «Audita flujo completo de NORA» y su reporte de reparación del 14 de septiembre de 2026: agenda, permisos, integración multimedia, registros y límites de cobertura.
- Conversación de Codex «Revisar fallo de NORA en WhatsApp»: incidencias históricas del puente de Make. No presentar las pruebas anteriores como garantía de disponibilidad actual.
- Proyecto NORA en ChatGPT: fuentes de auditoría y reparación.
- Definiciones actuales consultadas mediante el conector de n8n, contrastadas con el editor visual.
- Web pública de CARSA y vista previa original de una pieza publicitaria de Meta con llamada a WhatsApp.

## CARSA

La versión revisada está activa y tiene 32 nodos. Incluye recepción y respuesta por WhatsApp, validación de eventos, extracción estructurada, clasificación de prospectos, memoria, recuperación de conocimiento y registro en Google Sheets. La pieza publicitaria es una vista previa de creativo; no se afirma que la campaña esté actualmente en circulación ni se atribuyen resultados comerciales.

## NORA

Se revisaron nueve flujos: Chat (75 nodos), Core (65), WhatsApp Gateway (27), Error Handler (3), Automation Builder (5), Proactive Briefs (5), Technical Monitor (6), Location Ingest (4) y Dashboard (4). El núcleo contiene un diseño de siete agentes especializados.

Chat, Core, Gateway, Error Handler, Automation Builder y Proactive Briefs figuran activos. Technical Monitor, Location Ingest y Dashboard figuran inactivos. También hay ramas desactivadas dentro del Core: un flujo activo no significa que todas sus ramas o integraciones estén habilitadas.

La descripción actual del Gateway indica observación pasiva, sin respuesta automática a terceros. Sus rutas y herramientas multimedia forman parte del desarrollo, con cobertura de pruebas histórica documentada. No se publican datos financieros, conversaciones, ubicaciones personales, credenciales, enlaces administrativos ni identificadores de clientes.

## Material visual

- Dos portadas generadas como ilustraciones conceptuales, identificadas así en la web.
- Capturas reales del editor de CARSA, NORA Chat y NORA Core.
- Captura real de la web pública de CARSA con sus accesos de contacto.
- Captura real de una vista previa publicitaria de Meta con botón de WhatsApp. El encuadre vertical se realiza mediante CSS sobre la captura original; el contenido del anuncio no se modifica.
- Los diagramas de pasos son esquemas explicativos de la arquitectura, no demostraciones conectadas a los sistemas.

## Prototipos adicionales con código a medida

NEXO (soporte técnico) y TURNO (reservas/citas) evolucionaron a prototipos propios documentados. Sus interfaces ejecutan reglas locales con datos de ejemplo. Se muestran capturas reales y fragmentos extraídos de los archivos fuente. El alcance y las conexiones se detallan en `docs/custom-agent-prototypes.md`. No se presentan como agentes de IA completos ni como trabajos de clientes.

## Mantenimiento

Al cambiar el alcance o la configuración de los sistemas, revisar `lib/agent-projects.ts`, esta evidencia y la fecha de revisión. Actualizar capturas cuando la arquitectura cambie. Las rutas están registradas en `lib/site.ts`, de donde se derivan sitemap, idiomas y selección manual de idioma.
