# Portafolio de Iván Zavala

Sitio: https://ivanzavala.dev

Repositorio: https://github.com/ZavalaIvan/ivanzavala-portfolio

## Desarrollo local

Requisitos: Node.js 24 y npm. Ejecuta estos comandos desde la carpeta del proyecto:

```powershell
npx --yes pnpm@10.29.3 install --frozen-lockfile
npm run dev
```

Abre http://localhost:3000. Para comprobar la compilación de producción:

```powershell
npm run build
```

## Publicación

El proyecto `iz-portfolio` del equipo `zavalaivans-projects` en Vercel está conectado a este repositorio. Los cambios enviados a `main` se publican automáticamente en https://ivanzavala.dev.

```powershell
git add .
git commit -m "Describe los cambios"
git push origin main
```

El historial del portafolio se conserva en este repositorio. El repositorio anterior es https://github.com/ZavalaIvan/iz-portfolio.

## Contenido y rutas

La versión española comienza en `/` y la inglesa en `/en`. Cada servicio, colección de proyectos y página informativa tiene una dirección propia. El selector de idioma conserva la página equivalente.

Al entrar a `/`, `proxy.ts` consulta la elección guardada y después el idioma preferido del navegador (`Accept-Language`). Una preferencia española muestra español; los demás idiomas muestran inglés. Cuando no se comunica un idioma, se conserva español para mantener disponible la portada original, también para buscadores.

El selector utiliza `/choose-language`, guarda una cookie de preferencia durante un año y redirige a la página equivalente. La navegación a Inicio conserva el idioma de la página. Las direcciones internas explícitas, el sitemap, los archivos y las APIs mantienen su comportamiento. Los enlaces del selector son enlaces normales, por lo que el cambio funciona también sin JavaScript y no se ejecuta durante la precarga de páginas.

- `lib/site.ts`: rutas, contacto, títulos y descripciones para buscadores.
- `lib/services.ts`: textos, alcance y preguntas frecuentes de los servicios.
- `components/sections/`: portada, perfil, proyectos, proceso y contacto.
- `app/sitemap.ts` y `app/robots.ts`: descubrimiento de las páginas públicas.

Los proyectos recientes identifican los estados **Listo** y **En desarrollo**. Las galerías separan las demostraciones de los sitios publicados. Actualiza esos estados cuando exista una entrega confirmada.

La colección de agentes incluye los casos CARSA y NORA, además de NEXO (soporte) y TURNO (reservas), dos prototipos propios con código a medida. Sus demos ejecutan reglas locales con datos de ejemplo; los modelos de IA y las cuentas externas no están conectados. El explorador muestra fragmentos reales del código y distingue reglas ejecutadas, contratos y adaptadores preparados. Consulta `docs/custom-agent-prototypes.md` para conocer el alcance.

Para comprobar las reglas de diagnóstico, disponibilidad y los contratos HTTP sin realizar solicitudes externas: `node scripts/verify-agent-prototypes.cjs`.

El formulario de contacto prepara un mensaje local para que el visitante lo revise y envíe desde su correo o WhatsApp. No almacena consultas ni envía mensajes automáticamente. Las condiciones de garantía y el costo del mantenimiento se acuerdan en cada propuesta.

## Servicios de contadores QR

Las funciones de contadores QR utilizan `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`. La configuración de producción permanece en Vercel. Si necesitas estas funciones localmente, configura las variables en `.env.local`, que está excluido de Git. No publiques claves privadas.
