"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Bot, ChevronDown, Code2, FolderOpen, Globe, Home, Mail, Menu, Moon, Sun, User, Workflow, Wrench, X } from "lucide-react"
import { useTheme } from "next-themes"
import { pageHref, type Locale, type PageId } from "@/lib/site"
import { cn } from "@/lib/utils"

const Logo3D = dynamic(() => import("./Logo3D"), { ssr: false })

function Brand({ locale, onNavigate }: { locale: Locale; onNavigate: () => void }) {
  const modelRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    let angle = 0
    const onWheel = (event: WheelEvent) => {
      angle = (angle + event.deltaY * 0.3) % 360
      modelRef.current?.setAttribute("orientation", `${angle}deg 0deg 0deg`)
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    return () => window.removeEventListener("wheel", onWheel)
  }, [])
  return <Link href={pageHref("home", locale)} onClick={onNavigate} className="flex items-center gap-3 px-6 py-7"><div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center"><Logo3D modelRef={modelRef} alt={locale === "en" ? "Iván Zavala 3D logo" : "Logotipo 3D de Iván Zavala"} /></div><span className="text-sm font-semibold tracking-tight">iván zavala</span></Link>
}

export function SidebarNav({ activePage, locale }: { activePage: PageId; locale: Locale }) {
  const [expanded, setExpanded] = useState(["services", "process"])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const en = locale === "en"
  const closeMenu = () => setMobileOpen(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !mobileOpen) return
    dialog.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { dialog.close(); document.body.style.overflow = previous }
  }, [mobileOpen])
  const link = (id: PageId, label: string, Icon: typeof Home, child = false) => <Link key={id} href={pageHref(id, locale)} onClick={closeMenu} aria-current={activePage === id ? "page" : undefined} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent/60", child ? "text-[13px]" : "text-sm", activePage === id ? "bg-accent text-foreground" : "text-muted-foreground")}><Icon aria-hidden="true" className={child ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"} /><span className="font-medium">{label}</span></Link>
  const toggle = (id: string) => setExpanded(previous => previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id])
  const content = <nav className="flex h-full flex-col" aria-label={en ? "Main navigation" : "Navegación principal"}>
    <Brand locale={locale} onNavigate={closeMenu} />
    <div className="flex-1 overflow-y-auto px-3">
      {link("home", en ? "Home" : "Inicio", Home)}
      <button type="button" onClick={() => toggle("services")} aria-expanded={expanded.includes("services")} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent/60"><Workflow aria-hidden="true" className="h-4 w-4" /><span className="flex-1 text-left font-medium">{en ? "Services" : "Servicios"}</span><ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", expanded.includes("services") && "rotate-180")} /></button>
      {expanded.includes("services") && <div className="ml-4 border-l border-border pl-2">{link("automation", en ? "Automation" : "Automatización", Workflow, true)}{link("ai", en ? "AI agents" : "Agentes de IA", Bot, true)}{link("software", en ? "Custom software" : "Software a medida", Code2, true)}{link("support", en ? "Maintenance" : "Mantenimiento", Wrench, true)}</div>}
      {link("projects", en ? "Projects" : "Proyectos", FolderOpen)}
      <button type="button" onClick={() => toggle("process")} aria-expanded={expanded.includes("process")} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent/60"><Workflow aria-hidden="true" className="h-4 w-4" /><span className="flex-1 text-left font-medium">{en ? "Working together" : "Cómo trabajamos"}</span><ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", expanded.includes("process") && "rotate-180")} /></button>
      {expanded.includes("process") && <div className="ml-4 border-l border-border pl-2">{link("methodology", en ? "Process" : "Proceso", Workflow, true)}{link("engagement", en ? "Scope and pricing" : "Alcance y contratación", Code2, true)}</div>}
      {link("about", en ? "About me" : "Sobre mí", User)}
      {link("contact", en ? "Contact" : "Contacto", Mail)}
    </div>
    <div className="mt-4 flex flex-col gap-1 border-t border-border px-4 py-4">
      <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground">{mounted && resolvedTheme === "light" ? <Moon aria-hidden="true" className="h-4 w-4" /> : <Sun aria-hidden="true" className="h-4 w-4" />}<span>{mounted ? resolvedTheme === "dark" ? (en ? "Light mode" : "Modo claro") : (en ? "Dark mode" : "Modo oscuro") : (en ? "Theme" : "Tema")}</span></button>
      <Link href={pageHref(activePage, en ? "es" : "en")} hrefLang={en ? "es" : "en"} onClick={closeMenu} aria-label={en ? "Cambiar a español" : "Switch to English"} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground"><Globe aria-hidden="true" className="h-4 w-4" /><span>{en ? "Español" : "English"}</span></Link>
      <p className="px-3 pt-2 text-xs font-mono text-muted-foreground">Software · {en ? "AI · Automation" : "IA · Automatización"}</p>
    </div>
  </nav>
  return <>
    <button type="button" onClick={() => setMobileOpen(true)} aria-label={en ? "Open menu" : "Abrir menú"} aria-haspopup="dialog" className="fixed top-4 left-4 z-30 rounded-md border border-border bg-card p-2 lg:hidden"><Menu aria-hidden="true" className="h-5 w-5" /></button>
    <dialog ref={dialogRef} onCancel={event => { event.preventDefault(); closeMenu() }} onClick={event => { if (event.target === event.currentTarget) closeMenu() }} aria-label={en ? "Navigation menu" : "Menú de navegación"} className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[260px] max-w-[85vw] border-r border-border bg-sidebar-background p-0 text-foreground backdrop:bg-black/70"><button type="button" onClick={closeMenu} aria-label={en ? "Close menu" : "Cerrar menú"} className="absolute top-3 right-3 rounded-md p-2 text-muted-foreground hover:text-foreground"><X aria-hidden="true" className="h-4 w-4" /></button>{mobileOpen && content}</dialog>
    <aside className="sticky top-0 hidden h-screen w-[260px] min-w-[260px] flex-col border-r border-sidebar-border bg-sidebar-background lg:flex">{content}</aside>
  </>
}





