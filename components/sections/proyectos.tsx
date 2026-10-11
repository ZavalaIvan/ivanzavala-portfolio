"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Hand } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import type { Locale } from "@/app/page"
import { EarthIcon } from "@/components/ui/earth"
import { LayoutPanelTopIcon } from "@/components/ui/layout-panel-top"
import { RocketIcon } from "@/components/ui/rocket"
import { AtomIcon } from "@/components/ui/atom"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

interface Project {
  name: string
  description: string
  tech: string[]
  link?: string
  github?: string
  status: string
  preview?: string
  embedUrl?: string
}

interface ProjectsSectionData {
  title: string
  description: string
  icon: React.ReactNode
  projects: Project[]
}

const CODEPEN_BASE = "https://codepen.io/Ivan-Zavala/pen/"
const CODEPEN_EMBED_BASE = "https://codepen.io/Ivan-Zavala/embed/"

const cp = (id: string) => `${CODEPEN_BASE}${id}`
const cpe = (id: string) => `${CODEPEN_EMBED_BASE}${id}?default-tab=result&theme-id=dark`

const getYouTubePreviewEmbedUrl = (url?: string) => {
  if (!url) return null

  try {
    const parsed = new URL(url)
    let videoId = ""

    if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1)
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || ""
      if (!videoId && parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1] || ""
      }
    }

    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${videoId}&iv_load_policy=3&disablekb=1`
  } catch {
    return null
  }
}

const experimentsEs: Project[] = [
  { name: "Interfaz cinética", description: "Exploración de movimiento y respuesta visual en componentes interactivos.", tech: ["JavaScript", "CSS", "Animación"], status: "CodePen", link: cp("wBWbgoN"), embedUrl: cpe("wBWbgoN") },
  { name: "Transiciones de estado", description: "Microinteracciones para mejorar feedback visual y sensación de control.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("wBWbJvB"), embedUrl: cpe("wBWbJvB") },
  { name: "Laboratorio de componentes", description: "Prototipo enfocado en comportamiento dinámico y ajustes de estilo en vivo.", tech: ["JavaScript", "CSS", "Componentes"], status: "CodePen", link: cp("OPJGLgg"), embedUrl: cpe("OPJGLgg") },
  { name: "Escena interactiva", description: "Prueba visual con foco en jerarquía, capas y experiencia inmersiva.", tech: ["JavaScript", "CSS", "Visual"], status: "CodePen", link: cp("ZEdGGjx"), embedUrl: cpe("ZEdGGjx") },
  { name: "Motion playground", description: "Experimentación con ritmo, easing y secuencias para interfaces fluidas.", tech: ["JavaScript", "CSS", "UX"], status: "CodePen", link: cp("zxBQNJz"), embedUrl: cpe("zxBQNJz") },
  { name: "Prototipo responsivo", description: "Ensayo de comportamiento adaptativo para distintos anchos de pantalla.", tech: ["CSS", "Responsive", "Layout"], status: "CodePen", link: cp("emzavYR"), embedUrl: cpe("emzavYR") },
  { name: "Animaciones encadenadas", description: "Secuencias coordinadas para reforzar narrativa visual en interfaz.", tech: ["JavaScript", "CSS", "Animación"], status: "CodePen", link: cp("EayzZwW"), embedUrl: cpe("EayzZwW") },
  { name: "Control de eventos UI", description: "Prueba de interacciones por eventos con énfasis en respuesta inmediata.", tech: ["JavaScript", "DOM", "UI"], status: "CodePen", link: cp("LEZoxrQ"), embedUrl: cpe("LEZoxrQ") },
  { name: "Patrones de interfaz", description: "Colección de recursos visuales aplicados a interfaces experimentales.", tech: ["CSS", "Diseño UI", "Front-End"], status: "CodePen", link: cp("RNRmKOv"), embedUrl: cpe("RNRmKOv") },
  { name: "Button balls", description: "Botón con comportamiento físico y feedback animado en tiempo real.", tech: ["JavaScript", "CSS", "Interacción"], status: "CodePen", link: cp("NWVmmJE"), embedUrl: cpe("NWVmmJE") },
  { name: "Exploración de layouts", description: "Composición de bloques y sistema de espaciado para pantallas complejas.", tech: ["CSS", "Grid", "Layout"], status: "CodePen", link: cp("OPXYpOM"), embedUrl: cpe("OPXYpOM") },
  { name: "Efectos de hover avanzados", description: "Variaciones de hover con foco en claridad, contraste y microfeedback.", tech: ["CSS", "JavaScript", "Microinteracción"], status: "CodePen", link: cp("ZYONeJv"), embedUrl: cpe("ZYONeJv") },
  { name: "UI dinámica", description: "Interfaz experimental que prioriza legibilidad y movimiento controlado.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("dPXEvRr"), embedUrl: cpe("dPXEvRr") },
  { name: "Tarjetas interactivas", description: "Prueba de componentes tipo card con foco en jerarquía de contenido.", tech: ["CSS", "JavaScript", "Componentes"], status: "CodePen", link: cp("EayzWaQ"), embedUrl: cpe("EayzWaQ") },
  { name: "Estado y transición", description: "Evaluación de cambios de estado para lograr interacciones predecibles.", tech: ["JavaScript", "UI", "UX"], status: "CodePen", link: cp("emzavzG"), embedUrl: cpe("emzavzG") },
  { name: "Composición visual", description: "Ejercicio de ritmo y balance visual aplicado a elementos funcionales.", tech: ["CSS", "Diseño", "Front-End"], status: "CodePen", link: cp("WbxBpOo"), embedUrl: cpe("WbxBpOo") },
  { name: "Interacción progresiva", description: "Escalado de interacciones desde acciones simples hasta flujos completos.", tech: ["JavaScript", "DOM", "UX"], status: "CodePen", link: cp("qENGmob"), embedUrl: cpe("qENGmob") },
  { name: "Pruebas de accesibilidad visual", description: "Ajustes de contraste, tamaño y feedback para mejorar comprensión.", tech: ["CSS", "Accesibilidad", "UI"], status: "CodePen", link: cp("yyJWbvZ"), embedUrl: cpe("yyJWbvZ") },
  { name: "Navegación experimental", description: "Patrones de navegación alternativos con foco en claridad de recorrido.", tech: ["JavaScript", "UI", "Arquitectura"], status: "CodePen", link: cp("RNRmpMw"), embedUrl: cpe("RNRmpMw") },
  { name: "Sistema de estilos", description: "Prueba de consistencia visual y reutilización de patrones tipográficos.", tech: ["CSS", "Design System", "UI"], status: "CodePen", link: cp("ZYONexr"), embedUrl: cpe("ZYONexr") },
  { name: "Canvas de ideas", description: "Espacio de experimentación para validar conceptos visuales rápidamente.", tech: ["JavaScript", "Canvas", "Creatividad"], status: "CodePen", link: cp("QwERpQv"), embedUrl: cpe("QwERpQv") },
  { name: "Patrones modulares", description: "Bloques de interfaz desacoplados para iterar más rápido en prototipos.", tech: ["JavaScript", "CSS", "Modular"], status: "CodePen", link: cp("pvbmepr"), embedUrl: cpe("pvbmepr") },
  { name: "Interacciones temporizadas", description: "Pruebas con tiempos y demoras para dirigir atención del usuario.", tech: ["JavaScript", "Animación", "UX"], status: "CodePen", link: cp("zxBQdxP"), embedUrl: cpe("zxBQdxP") },
  { name: "Laboratorio de tipografía", description: "Exploración de jerarquía tipográfica combinada con elementos dinámicos.", tech: ["CSS", "Tipografía", "Diseño"], status: "CodePen", link: cp("gbMJRGQ"), embedUrl: cpe("gbMJRGQ") },
  { name: "Prototipo narrativo", description: "Combinación de movimiento y contenido para contar una historia visual.", tech: ["JavaScript", "CSS", "Storytelling"], status: "CodePen", link: cp("myEYwVx"), embedUrl: cpe("myEYwVx") },
  { name: "Interfaz reactiva", description: "Ajustes de comportamiento en tiempo real según acciones del usuario.", tech: ["JavaScript", "Estado", "UI"], status: "CodePen", link: cp("QwERvJJ"), embedUrl: cpe("QwERvJJ") },
  { name: "Cierre de colección", description: "Experimento final del set con síntesis de recursos visuales y técnicos.", tech: ["JavaScript", "CSS", "CodePen"], status: "CodePen", link: cp("bNeyRjX"), embedUrl: cpe("bNeyRjX") },
]

const experimentsEn: Project[] = [
  { name: "Kinetic interface", description: "Exploration of motion and visual response in interactive components.", tech: ["JavaScript", "CSS", "Animation"], status: "CodePen", link: cp("wBWbgoN"), embedUrl: cpe("wBWbgoN") },
  { name: "State transitions", description: "Micro-interactions designed to improve visual feedback and control.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("wBWbJvB"), embedUrl: cpe("wBWbJvB") },
  { name: "Component lab", description: "Prototype focused on dynamic behavior and live style tuning.", tech: ["JavaScript", "CSS", "Components"], status: "CodePen", link: cp("OPJGLgg"), embedUrl: cpe("OPJGLgg") },
  { name: "Interactive scene", description: "Visual experiment focused on hierarchy, layers, and immersion.", tech: ["JavaScript", "CSS", "Visual"], status: "CodePen", link: cp("ZEdGGjx"), embedUrl: cpe("ZEdGGjx") },
  { name: "Motion playground", description: "Experimenting with rhythm, easing, and sequencing for fluid interfaces.", tech: ["JavaScript", "CSS", "UX"], status: "CodePen", link: cp("zxBQNJz"), embedUrl: cpe("zxBQNJz") },
  { name: "Responsive prototype", description: "Adaptive behavior tests across different viewport sizes.", tech: ["CSS", "Responsive", "Layout"], status: "CodePen", link: cp("emzavYR"), embedUrl: cpe("emzavYR") },
  { name: "Chained animations", description: "Coordinated animation sequences to reinforce visual storytelling.", tech: ["JavaScript", "CSS", "Animation"], status: "CodePen", link: cp("EayzZwW"), embedUrl: cpe("EayzZwW") },
  { name: "UI event control", description: "Interaction tests based on events with immediate response behavior.", tech: ["JavaScript", "DOM", "UI"], status: "CodePen", link: cp("LEZoxrQ"), embedUrl: cpe("LEZoxrQ") },
  { name: "Interface patterns", description: "Collection of visual resources applied to UI experiments.", tech: ["CSS", "UI Design", "Front-End"], status: "CodePen", link: cp("RNRmKOv"), embedUrl: cpe("RNRmKOv") },
  { name: "Button balls", description: "Button experiment with physical behavior and real-time animated feedback.", tech: ["JavaScript", "CSS", "Interaction"], status: "CodePen", link: cp("NWVmmJE"), embedUrl: cpe("NWVmmJE") },
  { name: "Layout exploration", description: "Block composition and spacing system for complex screens.", tech: ["CSS", "Grid", "Layout"], status: "CodePen", link: cp("OPXYpOM"), embedUrl: cpe("OPXYpOM") },
  { name: "Advanced hover effects", description: "Hover variations focused on clarity, contrast, and micro-feedback.", tech: ["CSS", "JavaScript", "Microinteraction"], status: "CodePen", link: cp("ZYONeJv"), embedUrl: cpe("ZYONeJv") },
  { name: "Dynamic UI", description: "Interface experiment prioritizing readability and controlled motion.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("dPXEvRr"), embedUrl: cpe("dPXEvRr") },
  { name: "Interactive cards", description: "Card component test focused on content hierarchy.", tech: ["CSS", "JavaScript", "Components"], status: "CodePen", link: cp("EayzWaQ"), embedUrl: cpe("EayzWaQ") },
  { name: "State and transition", description: "State-change evaluation for predictable interaction behavior.", tech: ["JavaScript", "UI", "UX"], status: "CodePen", link: cp("emzavzG"), embedUrl: cpe("emzavzG") },
  { name: "Visual composition", description: "Exercise in rhythm and balance applied to functional elements.", tech: ["CSS", "Design", "Front-End"], status: "CodePen", link: cp("WbxBpOo"), embedUrl: cpe("WbxBpOo") },
  { name: "Progressive interaction", description: "Scales interactions from simple actions to richer flows.", tech: ["JavaScript", "DOM", "UX"], status: "CodePen", link: cp("qENGmob"), embedUrl: cpe("qENGmob") },
  { name: "Visual accessibility tests", description: "Contrast, sizing, and feedback adjustments for better comprehension.", tech: ["CSS", "Accessibility", "UI"], status: "CodePen", link: cp("yyJWbvZ"), embedUrl: cpe("yyJWbvZ") },
  { name: "Navigation experiment", description: "Alternative navigation patterns focused on path clarity.", tech: ["JavaScript", "UI", "Architecture"], status: "CodePen", link: cp("RNRmpMw"), embedUrl: cpe("RNRmpMw") },
  { name: "Style system", description: "Visual consistency test and reusable typography patterns.", tech: ["CSS", "Design System", "UI"], status: "CodePen", link: cp("ZYONexr"), embedUrl: cpe("ZYONexr") },
  { name: "Idea canvas", description: "Sandbox to validate visual concepts quickly.", tech: ["JavaScript", "Canvas", "Creativity"], status: "CodePen", link: cp("QwERpQv"), embedUrl: cpe("QwERpQv") },
  { name: "Modular patterns", description: "Decoupled UI blocks for faster prototype iteration.", tech: ["JavaScript", "CSS", "Modular"], status: "CodePen", link: cp("pvbmepr"), embedUrl: cpe("pvbmepr") },
  { name: "Timed interactions", description: "Timing and delay experiments to guide user attention.", tech: ["JavaScript", "Animation", "UX"], status: "CodePen", link: cp("zxBQdxP"), embedUrl: cpe("zxBQdxP") },
  { name: "Typography lab", description: "Hierarchy exploration combining typography and dynamic elements.", tech: ["CSS", "Typography", "Design"], status: "CodePen", link: cp("gbMJRGQ"), embedUrl: cpe("gbMJRGQ") },
  { name: "Narrative prototype", description: "Combines motion and content to tell a visual story.", tech: ["JavaScript", "CSS", "Storytelling"], status: "CodePen", link: cp("myEYwVx"), embedUrl: cpe("myEYwVx") },
  { name: "Reactive interface", description: "Real-time behavior adjustments based on user actions.", tech: ["JavaScript", "State", "UI"], status: "CodePen", link: cp("QwERvJJ"), embedUrl: cpe("QwERvJJ") },
  { name: "Collection finale", description: "Final experiment in the set with a synthesis of visual and technical resources.", tech: ["JavaScript", "CSS", "CodePen"], status: "CodePen", link: cp("bNeyRjX"), embedUrl: cpe("bNeyRjX") },
]

const projectsData: Record<Locale, Record<string, ProjectsSectionData>> = {
  es: {
    "proyectos-sitios": {
      title: "Sitios Web",
      description: "Sitios web corporativos y de presentación, optimizados para SEO y rendimiento.",
      icon: <EarthIcon size={20} />,
      projects: [
        { name: "Exploración visual de arquitectura con stack moderno (Next.js + React)", description: "Proyecto personal orientado a exploración visual de arquitectura y fotografía arquitectónica, implementado con React y Next.js utilizando generación de sitios estáticos (SSG) para optimizar performance y tiempos de carga. La interfaz se construyó con Tailwind CSS y componentes de shadcn/ui sobre Radix UI, priorizando composición visual, jerarquía tipográfica y layout responsive. Se integró analítica con GA4, optimización de carga de fuentes vía Google Font API, y se configuró despliegue en SiteGround con Nginx como proxy reverso. El pipeline de desarrollo utiliza Turbopack y Priority Hints para mejorar la priorización de recursos críticos en el render inicial. El proyecto funciona como sandbox para probar arquitectura de frontend, performance en SSG y patrones de UI reutilizables para futuros proyectos productivos.", tech: ["Next.js", "React", "SSG", "Tailwind CSS", "shadcn/ui", "Radix UI", "Performance", "Nginx", "GA4"], status: "Demo", link: "https://ivanz88.sg-host.com/", preview: "https://i.imgur.com/ZSqN1vt.gif" },
        { name: "Sistema web para agencia de marketing con frontend moderno y backend serverless", description: "Proyecto demo de sitio corporativo para agencia de marketing, implementado con React y Next.js (SSG/SSR híbrido) con arquitectura de frontend orientada a performance y escalabilidad. Se integró Supabase como backend ligero para manejo de datos, autenticación básica y futuras extensiones de formularios/lead management. La UI se construyó con Tailwind CSS y componentes de shadcn/ui sobre Radix UI, priorizando consistencia visual, accesibilidad y reutilización de componentes. Se optimizó el render inicial con Priority Hints y se configuró pipeline de desarrollo con Turbopack. El proyecto incluye instrumentación de eventos para redes de publicidad (DoubleClick Floodlight) y utilidades de frontend con Lodash para manejo de estado y transformación de datos.", tech: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Radix UI", "SSG/SSR", "Performance", "Turbopack", "Ads Tracking"], status: "Demo", link: "https://marketing-web-template.vercel.app/", preview: "https://youtu.be/Qn7HhzGG5Vc" },
        { name: "Sistema de motion y layout dinámico para estudio creativo (Next.js)", description: "Proyecto demo para explorar motion design y narrativa visual en un sitio para despacho de interiorismo, implementado con React y Next.js (SSG). Se integraron animaciones con GSAP para control de timelines y transiciones entre secciones, y Lenis para scroll suave con sincronización de animaciones. El layout se construyó con flujos no lineales y componentes modulares, reutilizando patrones previos dentro del ecosistema de Next.js. Se priorizó performance en el render inicial mediante Priority Hints, carga progresiva de assets y control de ejecución de animaciones en móviles, funcionando como laboratorio de UI/motion para prototipar interacciones reutilizables en proyectos productivos.", tech: ["Next.js", "React", "GSAP", "Lenis", "Motion Design", "SSG", "Performance", "Nginx", "GA4"], status: "Demo", link: "https://ivanz89.sg-host.com/", preview: "https://youtu.be/-2bu2h-BvPo" },
        { name: "Galería minimalista para fotografía arquitectónica con scroll cinemático (GSAP)", description: "Proyecto demo enfocado en una galería visual minimalista para presentar imágenes de gran formato y alto impacto visual. Implementado en HTML, CSS y JavaScript con scroll suave mediante Lenis y animaciones controladas con GSAP para reforzar la transición entre escenas sin sobrecargar la interfaz. Se priorizó una composición limpia, tipografía contenida y jerarquía visual enfocada en el contenido, con optimización de carga de imágenes y distribución de assets vía CDN (Cloudflare / jsDelivr / unpkg). Se integró GA4 para instrumentar navegación básica dentro de la experiencia visual.", tech: ["HTML", "CSS", "JavaScript", "GSAP", "Lenis", "Minimal UI", "Image Gallery", "CDN", "GA4", "Performance"], status: "Demo", link: "https://ivanz90.sg-host.com/", preview: "https://youtu.be/8C29lbWuEvw" },
        { name: "Arquitectura de motion UI para sitio de estudio de interiorismo", description: "Proyecto demo para un estudio de arquitectura, implementado con React y Next.js (SSG), con enfoque en microanimaciones y motion UI para enriquecer la experiencia sin saturar la interfaz. Las transiciones y estados de componentes se resolvieron con Framer Motion, y el scroll suave con Lenis para sincronizar animaciones con la navegación. La UI se construyó con Tailwind CSS y componentes de shadcn/ui sobre Radix UI, priorizando accesibilidad, composición modular y consistencia visual. Se optimizó el render inicial con Priority Hints, se integró GA4 para analítica de interacción y se desplegó bajo Nginx como proxy reverso en SiteGround, cuidando performance y estabilidad en producción.", tech: ["Next.js", "React", "Framer Motion", "Lenis", "Tailwind CSS", "shadcn/ui", "Radix UI", "SSG", "Performance", "GA4", "Nginx"], status: "Demo", link: "https://ivanz90.sg-host.com/", preview: "https://youtu.be/PZfKFIgPr1w" },
        { name: "Bienes Raíces - Integración personalizada de EasyBroker en WordPress", description: "Se desarrolló un sitio web inmobiliario en WordPress utilizando su CMS para la gestión de contenido por parte del cliente. Debido a que EasyBroker no expone una API pública oficial, se implementó una integración personalizada mediante un plugin propio que consume, normaliza y mapea los datos de propiedades hacia estructuras internas de WordPress (custom post types y meta fields). La sincronización del catálogo se resolvió mediante procesos automatizados con control de caché y actualización periódica para evitar impactos de performance. El frontend se montó sobre una plantilla seleccionada por el cliente, adaptada a su branding, con renderizado de listados, fichas de propiedad y filtros, manteniendo una arquitectura escalable para futuras extensiones.", tech: ["WordPress", "Plugin Development", "API Integration", "Custom Post Types", "Data Mapping", "Performance"], status: "Live", link: "https://negocianterealestate.com/", preview: "https://youtu.be/hjv3JFzTsJE" },
        { name: "Landing page estática para marca gastronómica", description: "Se desarrolló un sitio web estático utilizando HTML, CSS y JavaScript puro, sin frameworks, priorizando control total del layout y bajo overhead en el frontend. El requerimiento principal fue traducir la identidad visual del restaurante —oscura, elegante y de carácter masculino— a una experiencia web basada en composición visual, fotografía de alto contraste y jerarquía tipográfica. El sitio se estructuró como una landing page informativa orientada a branding y presentación del concepto. Se integró OpenTable para el flujo de reservaciones directamente desde el sitio, manteniendo la experiencia del usuario dentro del ecosistema del restaurante. Adicionalmente, se desarrolló un popup de anuncios en la carga inicial para comunicar promociones y eventos temporales, se optimizó el peso de imágenes, estructura responsive y compatibilidad cross-browser, manteniendo el diseño consistente en distintos dispositivos sin dependencias externas.", tech: ["HTML", "CSS", "JavaScript", "Static Site", "OpenTable Integration", "UI Branding", "Performance"], status: "Live", link: "https://cienfuegos.mx/", preview: "https://youtu.be/tvaE6EzjBPI" },
        { name: "Experimento de UI animada para marca gastronómica", description: "Se desarrolló una landing page interactiva en HTML, CSS y JavaScript con enfoque en motion y microinteracciones para evitar una experiencia estática. Las animaciones se implementaron con GSAP para control de timelines y estados de UI, y la navegación de galerías y carruseles con Swiper. La interfaz se construyó de forma modular mediante templates en el frontend para reutilizar componentes animados. Se integró analítica con GA4 vía Google Tag Manager y se priorizó performance mediante lazy loading de media, optimización de assets y control de ejecución de animaciones en dispositivos móviles. Las imágenes del demo fueron generadas con IA como placeholders para validar narrativa visual antes de producción final.", tech: ["HTML", "CSS", "JavaScript", "GSAP", "Microinteractions", "Swiper.js", "lit-html", "GA4", "Tag Manager", "Performance"], status: "Demo", link: "https://ivanz31.sg-host.com/", preview: "https://youtu.be/o9kQovpPLWI" },
        { name: "Sistema de galería con scroll libre en dos ejes", description: "Se desarrolló una galería visual interactiva en HTML, CSS y JavaScript con navegación libre en ambos ejes (horizontal y vertical), permitiendo explorar el contenido mediante scroll continuo en múltiples direcciones. La experiencia se apoya en animaciones y control de estado con GSAP para manejar transiciones, inercia de movimiento y feedback visual durante la navegación. La arquitectura del frontend prioriza control de performance y fluidez en la manipulación del viewport, con carga optimizada de imágenes y control de eventos de scroll para evitar jank en dispositivos de bajo rendimiento. Se integró analítica con GA4 para instrumentar interacción del usuario dentro del canvas visual, y se desplegó bajo Nginx con CDN (jsDelivr) para distribución eficiente de assets estáticos.", tech: ["HTML", "CSS", "JavaScript", "GSAP", "Interactive Gallery", "2D Scrolling", "Performance", "GA4", "Nginx", "CDN"], status: "Demo", link: "https://ivanz87.sg-host.com/", preview: "https://youtu.be/6d3KezAIlL0" },
      ],
    },
    "proyectos-apps": {
      title: "Apps Web",
      description: "Aplicaciones web completas, listas para producción.",
      icon: <LayoutPanelTopIcon size={20} />,
      projects: [
        { name: "Sistema de reporting automatizado con dashboards por cliente", description: "Web app orientada a automatizar la entrega de reportes mensuales para clientes de SEO y posicionamiento, reemplazando presentaciones manuales por un portal self-serve. La arquitectura permite definir métricas personalizadas por usuario/cliente y renderizar dashboards dedicados con sus KPIs, histórico y comparativos, manteniendo separación lógica de datos por cuenta. El frontend se implementó con React y Next.js, con UI componible para configurar widgets/métricas y vistas de reportes. Se integraron visualizaciones con Recharts para gráficas y tarjetas de rendimiento, priorizando claridad de lectura y consistencia visual. La app se optimizó con Priority Hints y pipeline con Turbopack, y se desplegó en Vercel con HSTS y Vercel Analytics para instrumentar uso (vistas de reportes, interacción con métricas y engagement por cliente).", tech: ["Next.js", "React", "B2B SaaS", "Client Portals", "Dashboards", "Recharts", "Metrics", "Vercel", "Analytics", "Performance", "HSTS"], status: "Demo", link: "https://v0-panel-de-reportes-de-usuario.vercel.app/", preview: "https://youtu.be/HgNfUpvru54" },
        { name: "Sistema de e-commerce con enfoque en experiencia visual para marca de belleza", description: "E-commerce demo para marca de productos de belleza, implementado con React y Next.js (SSG), con arquitectura orientada a performance y experiencia visual de alta calidad. La interfaz prioriza composición tipográfica, fotografía de gran formato y microinteracciones sutiles para reforzar percepción de marca premium. Se integraron secciones con video ligero y animaciones discretas para enriquecer la narrativa sin comprometer tiempos de carga. La UI se construyó con Tailwind CSS y shadcn/ui sobre Radix UI, asegurando consistencia, accesibilidad y reutilización de componentes. Se optimizó el render inicial mediante Priority Hints y carga progresiva de media, con despliegue en Vercel bajo políticas de seguridad (HSTS) y analítica vía Vercel Analytics para instrumentar eventos clave de navegación y conversión.", tech: ["Next.js", "React", "E-commerce", "Visual UX", "Microinteractions", "Tailwind CSS", "shadcn/ui", "Radix UI", "Vercel", "Performance", "Analytics"], status: "Demo", link: "https://beauty-ecommerce-web.vercel.app/", preview: "https://youtu.be/FwdRnqpphYA" },
        { name: "Arquitectura de gestor financiero conversacional con IA", description: "Web app de finanzas personales implementada con React y Next.js, diseñada bajo un paradigma de interacción conversacional como capa principal de entrada de datos. La aplicación integra un motor de IA (ChatGPT) para interpretar lenguaje natural y convertir mensajes del usuario en transacciones estructuradas (ingresos, gastos, categorías, montos y fechas). Además del módulo conversacional, el sistema incluye dashboards financieros con métricas en tiempo real, categorización de gastos, visualización de estadísticas y módulo de proyecciones y metas de ahorro. La arquitectura separa la capa de UI, la lógica de procesamiento conversacional y el modelado de datos financieros para permitir escalabilidad futura (automatización, recomendaciones inteligentes, alertas predictivas). Se optimizó performance con Priority Hints y se desplegó en Vercel bajo políticas de seguridad (HSTS), priorizando fluidez en la experiencia conversacional y actualización reactiva de métricas tras cada interacción.", tech: ["Next.js", "React", "AI Integration", "Conversational UI", "Finance App", "Dashboards", "Data Modeling", "Vercel", "HSTS", "Performance"], status: "Demo", link: "https://v0-portal-financiero-conversacional.vercel.app/", preview: "https://youtu.be/HgNfUpvru54" },
        { name: "Sistema de e-commerce interactivo para marca de moda", description: "Proyecto demo de e-commerce para marca de moda, implementado con React y Next.js (SSG), con arquitectura de frontend orientada a performance y motion UI. La experiencia integra animaciones complejas con GSAP para transiciones de secciones, estados de componentes y narrativa visual, y Lenis para scroll suave sincronizado con animaciones. Se implementó flujo de catálogo, galería de producto y carrito de compra en frontend, con composición modular de componentes reutilizables. Se optimizó el render inicial mediante Priority Hints, carga progresiva de media y control de ejecución de animaciones en dispositivos móviles.", tech: ["Next.js", "React", "E-commerce", "GSAP", "Lenis", "Motion Design", "SSG", "Performance", "GA4", "Nginx"], status: "Demo", link: "https://ivanz92.sg-host.com/", preview: "https://youtu.be/HnEAPewnPX0" },
        { name: "Web app todo en uno para gestión de barberías/estéticas", description: "Web app demo de gestión integral para barberías y estéticas, implementada con React y Next.js como frontend principal, orientada a centralizar agendamiento, POS, CRM e inventario en una sola interfaz. La arquitectura prioriza flujos de reserva rápidos y de baja fricción para usuarios sin perfil técnico, con navegación clara y componentes reutilizables. La UI se construyó con Tailwind CSS y shadcn/ui sobre Radix UI, priorizando accesibilidad, consistencia visual y escalabilidad del sistema de componentes. Se optimizó el rendimiento con Priority Hints y pipeline de desarrollo con Turbopack. El despliegue se realizó en Vercel con políticas de seguridad (HSTS) y analítica vía Vercel Analytics para instrumentar flujos de conversión dentro de la app.", tech: ["Next.js", "React", "Web App", "Booking System", "POS", "CRM", "Tailwind CSS", "shadcn/ui", "Radix UI", "Vercel", "Performance", "Security"], status: "Demo", link: "https://barber-shop-full-system.vercel.app/", preview: "https://youtu.be/PflAV4jWCtI" },
        { name: "Arquitectura de plataforma educativa con roles y flujos multiperfil", description: "Web app demo de academia digital implementada con React y Next.js, con arquitectura de frontend orientada a manejar flujos diferenciados por rol (alumno, docente y administrador) dentro de una misma base de componentes. Se diseñaron dashboards con estados de progreso, cursos activos, tareas y clases en vivo, priorizando claridad de información y baja fricción de uso para perfiles no técnicos. La UI se construyó con Tailwind CSS y shadcn/ui sobre Radix UI para mantener consistencia visual y accesibilidad en múltiples vistas. El despliegue se realizó en Vercel con HSTS y analítica vía Vercel Analytics para instrumentar navegación entre módulos y eventos clave dentro de la plataforma. La arquitectura está preparada para escalar a integraciones de backend (auth, pagos, contenidos) sin reestructurar el frontend.", tech: ["Next.js", "React", "Web App", "Role-based UI", "Dashboards", "Tailwind CSS", "shadcn/ui", "Radix UI", "Vercel", "HSTS", "Analytics"], status: "Demo", link: "https://marketing-digital-academia.vercel.app/", preview: "https://youtu.be/QWK92JBAACg" },
        { name: "Sistema de gestión de membresías para negocios de fitness con multiusuarios", description: "Web app demo para gestión de membresías en negocios de fitness/health, implementada con React y Next.js, con arquitectura orientada a multi-tenant para permitir múltiples negocios y usuarios dentro de la misma base de aplicación. Se diseñaron flujos de administración de miembros, afiliaciones y visualización de métricas, priorizando claridad de uso para perfiles no técnicos. La UI se construyó con Tailwind CSS y shadcn/ui sobre Radix UI, con componentes reutilizables para paneles administrativos y vistas de usuario. Se integraron visualizaciones con Recharts para métricas básicas, se optimizó el render inicial con Priority Hints y se desplegó en Vercel con HSTS, manteniendo un pipeline de desarrollo con Turbopack orientado a iteración rápida.", tech: ["Next.js", "React", "Web App", "Multi-tenant", "Membership System", "Dashboards", "Recharts", "Tailwind CSS", "shadcn/ui", "Radix UI", "Vercel", "HSTS", "Performance"], status: "Demo", link: "https://membership-system-fitness.vercel.app/", preview: "https://youtu.be/x8HUsnPW0_k" },
        { name: "Plataforma de loyalty con niveles VIP y cupones para negocios físicos", description: "Web app demo de fidelización para clientes recurrentes en negocios físicos, implementada con React y Next.js, orientada a registrar visitas mediante QR y habilitar flujos de recompensas, cupones e historial de consumo. La arquitectura prioriza flujos de interacción rápidos en mobile, con estados claros de progreso y validación visual del escaneo. Se diseñó un sistema de gamificación con niveles VIP, progresión por visitas y desbloqueo de incentivos, modelado en componentes reutilizables dentro del frontend. La UI se construyó con Tailwind CSS y shadcn/ui sobre Radix UI, priorizando accesibilidad y consistencia visual. Se optimizó performance con Priority Hints y se desplegó en Vercel con HSTS y Vercel Analytics para instrumentar eventos de uso (escaneos, canjes, progreso de nivel).", tech: ["Next.js", "React", "Web App", "Multi-tenant", "Membership System", "Dashboards", "Recharts", "Tailwind CSS", "shadcn/ui", "Radix UI", "Vercel", "HSTS", "Performance"], status: "Demo", link: "https://app-fidelidad-barberia.vercel.app/", preview: "https://youtu.be/mrQORiHabVs" },
      ],
    },
    "proyectos-ai-tools": {
      title: "Herramientas IA",
      description: "Herramientas impulsadas por IA para resolver tareas específicas con flujos claros y accionables.",
      icon: <AtomIcon size={20} />,
      projects: [
        { name: "Generador de contenido SEO para e-commerce basado en visión + IA", description: "Herramienta web de generación automática de contenido para e-commerce, implementada con React y Next.js, que combina análisis de imagen con modelos de IA para producir títulos optimizados, descripciones persuasivas, palabras clave SEO y textos listos para publicidad. El sistema procesa la imagen subida por el usuario, extrae contexto semántico y genera múltiples salidas estructuradas según plataforma (Shopify, Mercado Libre, Instagram) y tono seleccionado. Incluye soporte multidioma (ES/EN) para adaptar la redacción al mercado objetivo. La arquitectura separa la capa de UI, el procesamiento de imagen y la generación textual, permitiendo escalar hacia nuevas plataformas o formatos sin modificar el núcleo del sistema. Desplegado en Vercel con HSTS y optimización mediante Priority Hints, priorizando respuesta rápida y experiencia fluida.", tech: ["Next.js", "React", "AI Integration", "Computer Vision", "SEO Automation", "E-commerce Tools", "Multilingual", "Vercel", "HSTS", "Performance"], status: "Live", link: "https://ai-product-describer.vercel.app/", preview: "https://youtu.be/dfK7F0Bf2LM" },
        { name: "Asistente de diagnóstico de errores con IA para logs y stack traces", description: "Herramienta web para depuración asistida por IA, implementada con React y Next.js. El usuario pega errores de consola, logs o stack traces y el sistema genera una explicación estructurada: qué significa el error, causas probables, cómo reproducirlo/validarlo y una lista priorizada de pasos para resolverlo. La arquitectura separa la UI de captura (input de error, ejemplos y controles) del motor de análisis, permitiendo ajustar el formato de salida por tipo de error (runtime, build, dependencias, red, etc.). Incluye historial local de análisis con categorización y favoritos para reutilizar soluciones frecuentes, optimizando el flujo de debugging en equipos o proyectos repetitivos. Desplegado en Vercel con HSTS y optimización de carga con Priority Hints, enfocado en respuesta rápida y UX de copiar/pegar -> diagnóstico accionable.", tech: ["Next.js", "React", "AI Integration", "Developer Tools", "Log Analysis", "Debugging Assistant", "Vercel", "HSTS", "Performance"], status: "Live", link: "https://ai-error-explainer-eight.vercel.app/", preview: "https://youtu.be/tq6klSZjIgQ" },
        { name: "Sistema de optimización de prompts con procesamiento asistido por IA", description: "Herramienta web enfocada en optimizar prompts para modelos de lenguaje, implementada con React y Next.js. La aplicación analiza texto libre ingresado por el usuario y lo transforma en una instrucción estructurada, incorporando contexto, objetivo y formato esperado para mejorar la calidad de salida en modelos de IA externos. La arquitectura separa la capa de UI, el motor de reformulación y la lógica de generación estructurada, permitiendo adaptar el sistema a distintos modelos de lenguaje sin modificar la interfaz. El frontend prioriza claridad de interacción y baja fricción: entrada libre, selector de estilo y generación instantánea del prompt optimizado listo para copiar. Desplegado en Vercel con políticas de seguridad (HSTS) y optimización de carga mediante Priority Hints, el proyecto funciona como demostración de diseño de herramientas utilitarias impulsadas por IA.", tech: ["Next.js", "React", "AI Integration", "Prompt Engineering", "LLM Tools", "Text Processing", "Vercel", "HSTS", "Performance"], status: "Live", link: "https://ai-product-describer.vercel.app/", preview: "https://youtu.be/ZXxMrqALGAk" },
      ],
    },
    /* "proyectos-mvps": {
      title: "MVPs",
      description: "Productos minimos viables entregados en tiempo record.",
      icon: <RocketIcon size={20} />,
      projects: [
        { name: "ValidaBot", description: "Herramienta de validacion de ideas de negocio con encuestas automatizadas y analisis de mercado.", tech: ["Next.js", "OpenAI", "Supabase"], status: "Beta", link: "#" },
        { name: "QuickInvoice", description: "Generador de facturas para freelancers con envio automatico y tracking de pagos.", tech: ["React", "Node.js", "PDF", "Stripe"], status: "Lanzado", link: "#" },
        { name: "FitTrack", description: "App de seguimiento de rutinas de ejercicio con progresion visual y estadisticas.", tech: ["Next.js", "Supabase", "Charts"], status: "MVP", link: "#" },
      ],
    }, */
    "proyectos-experimentos": {
      title: "Experimentos",
      description: "Exploraciones técnicas y proyectos personales.",
      icon: <RocketIcon size={20} />,
      projects: experimentsEs,
    },
  },
  en: {
    "proyectos-sitios": {
      title: "Websites",
      description: "Corporate and marketing websites optimized for SEO and performance.",
      icon: <EarthIcon size={20} />,
      projects: [
        { name: "TechCorp Corporate Website", description: "Corporate website with integrated CMS, multilingual support, and advanced SEO optimization.", tech: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi CMS"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Design Portfolio", description: "Professional digital portfolio with interactive gallery, animation, and direct contact.", tech: ["React", "Framer Motion", "Tailwind", "SendGrid"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Blog + Ecommerce Website", description: "Integrated blog and store platform with dynamic articles and shopping cart.", tech: ["Next.js", "MDX", "Stripe", "PostgreSQL"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
      ],
    },
    "proyectos-apps": {
      title: "Web Apps",
      description: "Complete web applications ready for production.",
      icon: <LayoutPanelTopIcon size={20} />,
      projects: [
        { name: "SaaS Dashboard", description: "Control panel for subscriptions and real-time business metrics.", tech: ["Next.js", "TypeScript", "Supabase", "Stripe"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Headless Ecommerce", description: "Online store with headless CMS, payment gateway, and automated inventory management.", tech: ["React", "Node.js", "PostgreSQL", "Tailwind"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Booking Platform", description: "Reservation system with interactive calendar, notifications, and integrated payments.", tech: ["Next.js", "Prisma", "Resend", "Vercel"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
      ],
    },
    "proyectos-ai-tools": {
      title: "AI Tools",
      description: "AI-powered tools designed to solve focused workflows with fast, practical outcomes.",
      icon: <AtomIcon size={20} />,
      projects: [
        { name: "AI-assisted prompt optimization system", description: "Web tool focused on optimizing prompts for language models, built with React and Next.js. The app analyzes user-provided free text and transforms it into a structured instruction, adding context, objective, and expected format to improve output quality in external AI models. The architecture separates the UI layer, reformulation engine, and structured generation logic, making it adaptable to different language models without changing the interface. The frontend prioritizes clarity and low-friction interaction: free-text input, style selector, and instant generation of a copy-ready optimized prompt. Deployed on Vercel with HSTS security policies and Priority Hints-based loading optimization, the project demonstrates practical AI utility-tool design.", tech: ["Next.js", "React", "AI Integration", "Prompt Engineering", "LLM Tools", "Text Processing", "Vercel", "HSTS", "Performance"], status: "Live", link: "https://ai-product-describer.vercel.app/", preview: "https://youtu.be/ZXxMrqALGAk" },
      ],
    },
    /* "proyectos-mvps": {
      title: "MVPs",
      description: "Minimum viable products delivered in record time.",
      icon: <RocketIcon size={20} />,
      projects: [
        { name: "ValidaBot", description: "Business idea validation tool with automated surveys and market analysis.", tech: ["Next.js", "OpenAI", "Supabase"], status: "Beta", link: "#" },
        { name: "QuickInvoice", description: "Invoice generator for freelancers with automated sending and payment tracking.", tech: ["React", "Node.js", "PDF", "Stripe"], status: "Launched", link: "#" },
        { name: "FitTrack", description: "Workout tracking app with visual progression and analytics.", tech: ["Next.js", "Supabase", "Charts"], status: "MVP", link: "#" },
      ],
    }, */
    "proyectos-experimentos": {
      title: "Experiments",
      description: "Technical explorations and personal projects.",
      icon: <RocketIcon size={20} />,
      projects: experimentsEn,
    },
  },
}

export function ProyectosSection({ type, locale }: { type: "proyectos-sitios" | "proyectos-apps" | "proyectos-ai-tools" | "proyectos-mvps" | "proyectos-experimentos"; locale: Locale }) {
  const data = projectsData[locale][type]
  const showQR = type === "proyectos-sitios" || type === "proyectos-apps" || type === "proyectos-ai-tools"
  const isExperiments = type === "proyectos-experimentos"
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [activeTouchHint, setActiveTouchHint] = useState(0)
  const [qrReadCounts, setQrReadCounts] = useState<Record<string, number>>({})
  const [siteOrigin, setSiteOrigin] = useState("")

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return
      setIsMobile(window.innerWidth < 768)
      setIsCompact(window.innerWidth < 1024)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    setSiteOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    if (!showQR || !isCompact || isExperiments || data.projects.length === 0 || hoveredProject) return
    const interval = window.setInterval(() => {
      setActiveTouchHint((prev) => (prev + 1) % data.projects.length)
    }, 2200)
    return () => window.clearInterval(interval)
  }, [data.projects.length, hoveredProject, isCompact, isExperiments, showQR])

  const getProjectQrKey = (project: Project) => project.link || `${type}:${project.name}`

  const getTrackedQrValue = (project: Project) => {
    if (!project.link) return project.name
    if (!siteOrigin) return project.link

    const params = new URLSearchParams({
      key: getProjectQrKey(project),
      to: project.link,
    })

    return `${siteOrigin}/api/qr-scan?${params.toString()}`
  }

  const loadQrReads = async () => {
    if (!showQR || isExperiments || data.projects.length === 0) return
    const keys = data.projects.map((project) => getProjectQrKey(project)).join(",")

    try {
      const response = await fetch(`/api/qr-reads?keys=${encodeURIComponent(keys)}`, { method: "GET" })
      if (!response.ok) return
      const payload = (await response.json()) as { counts?: Record<string, number> }
      if (payload.counts) setQrReadCounts(payload.counts)
    } catch {
      // Keep UI functional if counting service fails
    }
  }

  useEffect(() => {
    void loadQrReads()
  }, [type, showQR, isExperiments, locale])

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-3">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">{data.icon}</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
          </div>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="text-muted-foreground text-sm">{data.description}</motion.p>
      </div>

      <div className="flex flex-col gap-4">
        {data.projects.map((project, i) => {
          const youtubePreviewUrl = getYouTubePreviewEmbedUrl(project.preview)
          const previewAlt = locale === "en" ? `Preview of ${project.name}` : `Preview de ${project.name}`
          const isActiveHintCard = showQR && isCompact && (activeTouchHint === i || hoveredProject === project.name)

          return isExperiments && !project.embedUrl ? null : <motion.div
            key={`${type}-${project.name}-${i}`}
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.15 * (i + 1) }}
            className={`group relative flex ${showQR ? "flex-col lg:flex-row lg:gap-6 gap-4" : "flex-col gap-4"} ${isExperiments ? "overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-0 hover:border-primary/40" : "p-5 rounded-lg border border-border bg-card hover:border-muted-foreground/20"} ${isActiveHintCard && !isExperiments ? "ring-1 ring-primary/35 border-primary/30" : ""} transition-all duration-300`}
            onMouseEnter={() => (showQR && !isMobile) && setHoveredProject(project.name)}
            onMouseLeave={() => {
              if (showQR && !isMobile) setHoveredProject(null)
              setMousePosition({ x: 0, y: 0 })
            }}
            onMouseMove={(e) => {
              if (!isMobile && showQR) {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left - rect.width / 2) * -0.5
                const y = (e.clientY - rect.top - rect.height / 2) * -0.5
                setMousePosition({ x, y })
              }
            }}
            onClick={() => showQR && isMobile && setHoveredProject(hoveredProject === project.name ? null : project.name)}
          >
            {showQR && (
              <div className="flex-shrink-0 flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <a
                    href={getTrackedQrValue(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => !project.link && e.preventDefault()}
                    className="p-2 bg-white rounded-md"
                    aria-label={locale === "en" ? `Open ${project.name} via QR` : `Abrir ${project.name} por QR`}
                  >
                    <QRCodeSVG value={getTrackedQrValue(project)} size={100} level="H" includeMargin={false} />
                  </a>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {locale === "en" ? "Reads" : "Lecturas"}: {qrReadCounts[getProjectQrKey(project)] || 0}
                  </span>
                </div>
              </div>
            )}

            <AnimatePresence>
              {showQR && hoveredProject === project.name && project.preview && (
                <>
                  {!isMobile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20, x: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: mousePosition.x }}
                      exit={{ opacity: 0, scale: 0.8, y: -20, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute lg:-top-32 lg:right-0 top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 z-50 pointer-events-none"
                    >
                      <div className="relative">
                        {youtubePreviewUrl ? (
                          <iframe
                            src={youtubePreviewUrl}
                            title={previewAlt}
                            className="w-56 sm:w-64 aspect-video rounded-lg border border-border bg-black"
                            loading="lazy"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.32)", transform: `translateY(${mousePosition.y}px)` }}
                          />
                        ) : (
                          <img
                            src={project.preview}
                            alt={previewAlt}
                            className="w-56 sm:w-64 h-auto rounded-lg border border-border"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.32)", transform: `translateY(${mousePosition.y}px)` }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {isMobile && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                      onClick={() => setHoveredProject(null)}
                    >
                      <div className="w-full max-w-md">
                        {youtubePreviewUrl ? (
                          <iframe
                            src={youtubePreviewUrl}
                            title={previewAlt}
                            className="w-full aspect-video rounded-lg border border-border bg-black"
                            loading="lazy"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)" }}
                          />
                        ) : (
                          <img
                            src={project.preview}
                            alt={previewAlt}
                            className="w-full h-auto rounded-lg border border-border"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)" }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>

            {isExperiments ? (
              <div className="flex flex-col">
                <div className="relative w-full bg-black">
                  <iframe
                    src={project.embedUrl}
                    title={locale === "en" ? `Embed of ${project.name}` : `Embed de ${project.name}`}
                    className="h-[320px] w-full md:h-[420px]"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
                <div className="flex flex-col gap-3 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded-sm bg-accent text-muted-foreground w-fit">{project.status}</span>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                        aria-label={locale === "en" ? `View ${project.name} on CodePen` : `Ver ${project.name} en CodePen`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={`${project.name}-${t}`} className="px-2 py-1 text-[11px] font-mono text-muted-foreground bg-secondary rounded-sm">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded-sm bg-accent text-muted-foreground w-fit">{project.status}</span>
                      {showQR && isCompact && isActiveHintCard && (
                        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2 py-1">
                          <div className="relative h-5 w-5">
                          <motion.span
                            aria-hidden="true"
                            initial={{ scale: 0.7, opacity: 0.55 }}
                            animate={{ scale: [0.7, 1.35], opacity: [0.55, 0] }}
                            transition={{ duration: 1.15, repeat: Infinity, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full border border-primary/40"
                          />
                          <motion.span
                            aria-hidden="true"
                            initial={{ y: 0, scale: 1 }}
                            animate={{ y: [0, 2, 0], scale: [1, 0.94, 1] }}
                            transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/10 text-primary"
                          >
                            <Hand className="h-3.5 w-3.5" />
                          </motion.span>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wide text-primary">
                            {locale === "en" ? "Tap" : "Toca"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                        aria-label={locale === "en" ? `View ${project.name}` : `Ver ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                        aria-label={locale === "en" ? `${project.name} GitHub` : `GitHub de ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={`${project.name}-${t}`} className="px-2 py-1 text-[11px] font-mono text-muted-foreground bg-secondary rounded-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        })}
      </div>
    </div>
  )
}









