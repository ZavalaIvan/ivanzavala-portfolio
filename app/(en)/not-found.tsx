import Link from "next/link"
export default function NotFound() {
  return <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-5 px-6"><p className="text-sm font-mono text-muted-foreground">404</p><h1 className="text-3xl font-bold">This page could not be found</h1><p className="text-muted-foreground">Return to the home page to explore services and projects.</p><Link href="/en" className="underline underline-offset-4">Return home</Link></main>
}
