import Link from "next/link"
export default function NotFound() {
  return <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-5 px-6"><p className="text-sm font-mono text-muted-foreground">404</p><h1 className="text-3xl font-bold">No encontramos esta página</h1><p className="text-muted-foreground">Puedes volver al inicio para conocer los servicios y proyectos.</p><Link href="/" className="underline underline-offset-4">Volver al inicio</Link></main>
}
