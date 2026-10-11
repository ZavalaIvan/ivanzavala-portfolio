"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { useTheme } from "next-themes"
import { pageHref, type Locale } from "@/lib/site"
import { cardClass, ContactCta, SectionHeading } from "@/components/section-ui"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const SPHERE_CONFIG = {
  autoRotateSpeed: 0.22,
  dragSensitivity: 0.5,
  momentumFriction: 0.94,
  maxRotationX: 60,
  resumeDelay: 1800,
}

const techLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", alt: "Prisma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", alt: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", alt: "Vercel" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google Cloud" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg", alt: "Framer Motion" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", alt: "Adobe Photoshop" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", alt: "Adobe Illustrator" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg", alt: "Adobe Premiere Pro" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg", alt: "Adobe After Effects" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", alt: "Google Ads / Analytics" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", alt: "WordPress SEO" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg", alt: "Meta Ads" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", alt: "Cloudflare" },
]

function getSphereSize(width: number) {
  if (width <= 480) return { container: 300, item: 50 }
  if (width <= 768) return { container: 360, item: 60 }
  return { container: 540, item: 84 }
}

function fibonacciSphere(samples: number, i: number) {
  const phi = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / (samples - 1)) * 2
  const radiusAtY = Math.sqrt(1 - y * y)
  const theta = phi * i
  return {
    x: Math.cos(theta) * radiusAtY,
    y,
    z: Math.sin(theta) * radiusAtY,
  }
}

function TechSphere({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({})
  const [sphereSize, setSphereSize] = useState(() =>
    typeof window === "undefined" ? { container: 540, item: 108 } : getSphereSize(window.innerWidth)
  )

  const points = useMemo(
    () => techLogos.map((_, i) => fibonacciSphere(techLogos.length, i)),
    []
  )

  useEffect(() => {
    const onResize = () => setSphereSize(getSphereSize(window.innerWidth))
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const radius = sphereSize.container * 0.44
    const offset = sphereSize.container / 2
    const state = {
      rotationX: -10,
      rotationY: 0,
      isDragging: false,
      previousX: 0,
      previousY: 0,
      velocityX: 0,
      velocityY: 0,
      autoRotate: true,
      lastPointerId: -1,
    }

    let momentumTimer: ReturnType<typeof setInterval> | null = null
    let resumeTimer: ReturnType<typeof setTimeout> | null = null
    let rafId = 0

    const clearTimers = () => {
      if (momentumTimer) {
        clearInterval(momentumTimer)
        momentumTimer = null
      }
      if (resumeTimer) {
        clearTimeout(resumeTimer)
        resumeTimer = null
      }
    }

    const updatePositions = () => {
      const radX = (state.rotationX * Math.PI) / 180
      const radY = (state.rotationY * Math.PI) / 180

      itemRefs.current.forEach((item, index) => {
        if (!item) return
        const p = points[index]

        const x1 = p.x * Math.cos(radY) - p.z * Math.sin(radY)
        const z1 = p.x * Math.sin(radY) + p.z * Math.cos(radY)
        const y1 = p.y * Math.cos(radX) - z1 * Math.sin(radX)
        const z2 = p.y * Math.sin(radX) + z1 * Math.cos(radX)

        const depthScale = (z2 + 1.5) / 2.5
        const translateX = x1 * radius
        const translateY = y1 * radius

        item.style.transform = `translate(-50%, -50%) translate(${translateX + offset}px, ${translateY + offset}px) scale(${0.5 + depthScale * 0.6})`
        item.style.zIndex = `${Math.round((z2 + 1) * 60)}`
        item.style.opacity = `${0.35 + depthScale * 0.65}`
      })
    }

    const clampX = () => {
      state.rotationX = Math.max(-SPHERE_CONFIG.maxRotationX, Math.min(SPHERE_CONFIG.maxRotationX, state.rotationX))
    }

    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true
      state.autoRotate = false
      state.lastPointerId = e.pointerId
      state.previousX = e.clientX
      state.previousY = e.clientY
      state.velocityX = 0
      state.velocityY = 0
      clearTimers()
      container.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!state.isDragging || e.pointerId !== state.lastPointerId) return
      const deltaX = e.clientX - state.previousX
      const deltaY = e.clientY - state.previousY

      state.velocityX = deltaX * SPHERE_CONFIG.dragSensitivity
      state.velocityY = deltaY * SPHERE_CONFIG.dragSensitivity * 0.6
      state.rotationY += state.velocityX
      state.rotationX += state.velocityY
      clampX()

      state.previousX = e.clientX
      state.previousY = e.clientY
      updatePositions()
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!state.isDragging || e.pointerId !== state.lastPointerId) return
      state.isDragging = false
      container.releasePointerCapture(e.pointerId)

      momentumTimer = setInterval(() => {
        if (Math.abs(state.velocityX) < 0.1 && Math.abs(state.velocityY) < 0.1) {
          if (momentumTimer) clearInterval(momentumTimer)
          momentumTimer = null
          resumeTimer = setTimeout(() => {
            state.autoRotate = true
          }, SPHERE_CONFIG.resumeDelay)
          return
        }

        state.velocityX *= SPHERE_CONFIG.momentumFriction
        state.velocityY *= SPHERE_CONFIG.momentumFriction
        state.rotationY += state.velocityX
        state.rotationX += state.velocityY
        clampX()
        updatePositions()
      }, 16)
    }

    const animate = () => {
      if (state.autoRotate && !state.isDragging) {
        state.rotationY += SPHERE_CONFIG.autoRotateSpeed
        updatePositions()
      }
      rafId = requestAnimationFrame(animate)
    }

    container.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    updatePositions()
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      clearTimers()
      container.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [points, sphereSize.container])

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: sphereSize.container, height: sphereSize.container }}>
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: sphereSize.container * 0.78,
          height: sphereSize.container * 0.78,
          background: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 36%, rgba(255,255,255,0.04) 58%, transparent 74%)"
            : "radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.05) 58%, transparent 74%)",
        }}
      />
      <div
        ref={containerRef}
        className="relative touch-none cursor-grab active:cursor-grabbing"
        style={{ width: sphereSize.container, height: sphereSize.container, transformStyle: "preserve-3d" }}
      >
        {techLogos.map((item, i) => (
          <div
            key={item.alt}
            ref={(el) => { itemRefs.current[i] = el }}
            className="absolute left-0 top-0 flex items-center justify-center rounded-2xl border border-white/20 bg-white/95 shadow-[0_10px_34px_rgba(0,0,0,0.15)]"
            style={{
              width: sphereSize.item,
              height: sphereSize.item,
              padding: Math.round(sphereSize.item * 0.13),
              backfaceVisibility: "hidden",
              transition: "box-shadow 0.25s ease",
            }}
          >
            {failedLogos[item.alt] ? (
              <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight px-1">
                {item.alt.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                title={item.alt}
                onError={() => setFailedLogos((prev) => ({ ...prev, [item.alt]: true }))}
                style={{
                  maxWidth: Math.round(sphereSize.item * 0.72),
                  maxHeight: Math.round(sphereSize.item * 0.5),
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


export function SobreMiSection({ locale }: { locale: Locale }) {
  const { resolvedTheme } = useTheme()
  const en = locale === "en"
  const paragraphs = en ? [
    "I'm Iván Zavala, a consultant and developer specializing in software, automation and artificial intelligence. I help growing businesses connect their tools and build solutions around their operations.",
    "My background combines software development, design and digital marketing. That multidisciplinary experience helps me understand the technical requirements of a project and the business goals behind it.",
    "I work directly with you from planning and design to implementation, launch and training. We review progress together and define a solution around your users, your tools and your priorities.",
  ] : [
    "Soy Iván Zavala, consultor y desarrollador especializado en software, automatización e inteligencia artificial. Ayudo a negocios en crecimiento a conectar sus herramientas y construir soluciones alrededor de su operación.",
    "Mi trayectoria combina desarrollo de software, diseño y marketing digital. Esa experiencia multidisciplinaria me permite comprender los requisitos técnicos de un proyecto y los objetivos de negocio que lo motivan.",
    "Trabajo directamente contigo desde la planeación y el diseño hasta la implementación, la puesta en marcha y la capacitación. Revisamos los avances juntos y definimos la solución alrededor de tus usuarios, tus herramientas y tus prioridades.",
  ]
  const capabilities = en ? [
    ["Software and integrations", "Custom web applications, business systems and connections between tools."],
    ["Automation and artificial intelligence", "Workflows and agents adapted to your business information and processes."],
    ["Design and digital strategy", "User experience, website design, SEO and Google and Meta advertising campaigns."],
  ] : [
    ["Software e integraciones", "Aplicaciones web a medida, sistemas de negocio y conexiones entre herramientas."],
    ["Automatización e inteligencia artificial", "Flujos y agentes adaptados a la información y los procesos de tu negocio."],
    ["Diseño y estrategia digital", "Experiencia de usuario, diseño web, SEO y campañas publicitarias en Google y Meta."],
  ]
  const values = en ? [
    ["Clarity", "A defined scope and direct communication about decisions and progress."],
    ["Business context", "Start with the problem and choose technology that serves the solution."],
    ["Quality", "Attention to usability, implementation and testing of the agreed functions."],
    ["Continuity", "Training at handover, a bug-fix warranty and optional monthly maintenance."],
  ] : [
    ["Claridad", "Un alcance definido y comunicación directa sobre las decisiones y los avances."],
    ["Contexto del negocio", "Partir del problema y elegir tecnología que contribuya a la solución."],
    ["Calidad", "Atención a la experiencia de uso, la implementación y las pruebas de las funciones acordadas."],
    ["Continuidad", "Capacitación al entregar, garantía de correcciones y mantenimiento mensual opcional."],
  ]
  return <div className="flex flex-col gap-10 py-6">
    <SectionHeading label={en ? "About me" : "Sobre mí"} title="Iván Zavala" description={en ? "Software, automation and AI consultant and developer" : "Consultor y desarrollador de software, automatización e inteligencia artificial"} />
    <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin aria-hidden="true" className="h-4 w-4" />{en ? "Remote projects · English & Spanish" : "Proyectos remotos · Español e inglés"}</p>
    <section className={`${cardClass} flex flex-col gap-4`}>{paragraphs.map(paragraph => <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">{paragraph}</p>)}</section>
    <section className="flex flex-col gap-4"><h2 className="text-xl font-semibold">{en ? "A connected view of your project" : "Una visión integral de tu proyecto"}</h2><div className="grid gap-4 md:grid-cols-3">{capabilities.map(([title, description]) => <article key={title} className={`${cardClass} flex flex-col gap-3`}><h3 className="text-base font-semibold">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></article>)}</div></section>
    <section className="flex flex-col gap-4"><h2 className="text-xl font-semibold">{en ? "How I approach the work" : "Cómo abordo el trabajo"}</h2><div className="grid gap-3 sm:grid-cols-2">{values.map(([title, description]) => <article key={title} className="rounded-lg bg-secondary/50 p-4"><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></article>)}</div><Link href={pageHref("methodology", locale)} className="text-sm underline underline-offset-4">{en ? "Explore the project process" : "Conoce el proceso de trabajo"}</Link></section>
    <section className="flex flex-col items-center gap-6 overflow-hidden"><h2 className="text-lg font-semibold text-center">{en ? "Technologies and tools" : "Tecnologías y herramientas"}</h2><TechSphere isDark={resolvedTheme === "dark"} /></section>
    <ContactCta locale={locale} />
  </div>
}
