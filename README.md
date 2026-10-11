# Portafolio de Ivan Zavala

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

## Configuración de servicios

Las funciones de contadores QR utilizan `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`. La configuración de producción permanece en Vercel. Si necesitas estas funciones localmente, configura las variables en `.env.local`, que está excluido de Git. No publiques claves privadas.
