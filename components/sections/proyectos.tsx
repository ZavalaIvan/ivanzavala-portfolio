"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Hand } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import type { Locale } from "@/lib/site"
import { LayoutPanelTopIcon } from "@/components/ui/layout-panel-top"

const fadeUp = {
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

const projectsData: Record<Locale, Record<string, { title: string; description: string; projects: Project[] }>> = {
  "es": {
"proyectos-experimentos": {
  "title": "Experimentos de interfaz y movimiento",
  "description": "Exploraciones de animación, interacción y diseño realizadas en CodePen.",
  "projects": experimentsEs
},
    "proyectos-sitios": {
      "title": "Diseño y desarrollo de sitios web",
      "description": "Una selección de sitios, herramientas y demostraciones que muestran distintas formas de resolver necesidades con tecnología.",
      "projects": [
        {
          "name": "Sitio de arquitectura",
          "description": "Exploración visual de proyectos arquitectónicos con una interfaz centrada en imágenes y navegación.",
          "tech": [
            "Next.js",
            "React",
            "SSG",
            "Tailwind CSS",
            "shadcn/ui",
            "Radix UI"
          ],
          "status": "Demostración",
          "link": "https://ivanz88.sg-host.com/",
          "preview": "https://i.imgur.com/ZSqN1vt.gif"
        },
        {
          "name": "Sitio para agencia de marketing",
          "description": "Demostración de un sitio para presentar servicios, proyectos y una propuesta comercial.",
          "tech": [
            "Next.js",
            "React",
            "Supabase",
            "PostgreSQL",
            "Tailwind CSS",
            "shadcn/ui"
          ],
          "status": "Demostración",
          "link": "https://marketing-web-template.vercel.app/",
          "preview": "https://youtu.be/Qn7HhzGG5Vc"
        },
        {
          "name": "Sitio para estudio creativo",
          "description": "Una experiencia web que combina composición visual y movimiento para presentar el trabajo del estudio.",
          "tech": [
            "Next.js",
            "React",
            "GSAP",
            "Lenis",
            "Motion Design",
            "SSG"
          ],
          "status": "Demostración",
          "link": "https://ivanz89.sg-host.com/",
          "preview": "https://youtu.be/-2bu2h-BvPo"
        },
        {
          "name": "Galería de fotografía arquitectónica",
          "description": "Una galería minimalista para recorrer imágenes con una experiencia de desplazamiento cuidada.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "GSAP",
            "Lenis",
            "Minimal UI"
          ],
          "status": "Demostración",
          "link": "https://ivanz90.sg-host.com/",
          "preview": "https://youtu.be/8C29lbWuEvw"
        },
        {
          "name": "Sitio de interiorismo",
          "description": "Demostración de una interfaz para presentar proyectos de interiorismo y contenido visual.",
          "tech": [
            "Next.js",
            "React",
            "Framer Motion",
            "Lenis",
            "Tailwind CSS",
            "shadcn/ui"
          ],
          "status": "Demostración",
          "link": "https://ivanz90.sg-host.com/",
          "preview": "https://youtu.be/PZfKFIgPr1w"
        },
        {
          "name": "Sitio inmobiliario con EasyBroker",
          "description": "Integración de propiedades de EasyBroker en un sitio de WordPress para consultar el catálogo inmobiliario.",
          "tech": [
            "WordPress",
            "Plugin Development",
            "API Integration",
            "Custom Post Types",
            "Data Mapping"
          ],
          "status": "Publicado",
          "link": "https://negocianterealestate.com/",
          "preview": "https://youtu.be/hjv3JFzTsJE"
        },
        {
          "name": "Sitio para marca gastronómica",
          "description": "Una página para presentar la propuesta gastronómica, información del negocio y opciones de contacto.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "Static Site",
            "OpenTable Integration",
            "UI Branding"
          ],
          "status": "Publicado",
          "link": "https://cienfuegos.mx/",
          "preview": "https://youtu.be/tvaE6EzjBPI"
        },
        {
          "name": "Experimento para marca gastronómica",
          "description": "Demostración de diseño y movimiento para explorar la presentación visual de una marca.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "GSAP",
            "Microinteractions",
            "Swiper.js"
          ],
          "status": "Demostración",
          "link": "https://ivanz31.sg-host.com/",
          "preview": "https://youtu.be/o9kQovpPLWI"
        },
        {
          "name": "Galería con navegación libre",
          "description": "Una exploración de galería visual con desplazamiento en dos direcciones.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "GSAP",
            "Interactive Gallery",
            "2D Scrolling"
          ],
          "status": "Demostración",
          "link": "https://ivanz87.sg-host.com/",
          "preview": "https://youtu.be/6d3KezAIlL0"
        }
      ]
    },
    "proyectos-apps": {
      "title": "Aplicaciones web: demostraciones",
      "description": "Una selección de sitios, herramientas y demostraciones que muestran distintas formas de resolver necesidades con tecnología.",
      "projects": [
        {
          "name": "Panel de reportes por cliente",
          "description": "Demostración de un panel que organiza reportes y datos por cliente para facilitar su consulta.",
          "tech": [
            "Next.js",
            "React",
            "B2B SaaS",
            "Client Portals",
            "Dashboards",
            "Recharts"
          ],
          "status": "Demostración",
          "link": "https://v0-panel-de-reportes-de-usuario.vercel.app/",
          "preview": "https://youtu.be/HgNfUpvru54"
        },
        {
          "name": "Tienda de productos de belleza",
          "description": "Demostración de una tienda en línea centrada en el catálogo y la experiencia visual de compra.",
          "tech": [
            "Next.js",
            "React",
            "E-commerce",
            "Visual UX",
            "Microinteractions",
            "Tailwind CSS"
          ],
          "status": "Demostración",
          "link": "https://beauty-ecommerce-web.vercel.app/",
          "preview": "https://youtu.be/FwdRnqpphYA"
        },
        {
          "name": "Gestor financiero conversacional",
          "description": "Demostración de una interfaz para consultar información financiera mediante conversaciones con IA.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Conversational UI",
            "Finance App",
            "Dashboards"
          ],
          "status": "Demostración",
          "link": "https://v0-portal-financiero-conversacional.vercel.app/",
          "preview": "https://youtu.be/HgNfUpvru54"
        },
        {
          "name": "Tienda para marca de moda",
          "description": "Demostración de una experiencia de comercio electrónico para presentar productos y recorrer el catálogo.",
          "tech": [
            "Next.js",
            "React",
            "E-commerce",
            "GSAP",
            "Lenis",
            "Motion Design"
          ],
          "status": "Demostración",
          "link": "https://ivanz92.sg-host.com/",
          "preview": "https://youtu.be/HnEAPewnPX0"
        },
        {
          "name": "Sistema para barberías y estéticas",
          "description": "Demostración de una aplicación con flujos de citas, clientes y operación del negocio.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Booking System",
            "POS",
            "CRM"
          ],
          "status": "Demostración",
          "link": "https://barber-shop-full-system.vercel.app/",
          "preview": "https://youtu.be/PflAV4jWCtI"
        },
        {
          "name": "Plataforma educativa",
          "description": "Demostración de una plataforma con vistas para alumnos, docentes y administración.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Role-based UI",
            "Dashboards",
            "Tailwind CSS"
          ],
          "status": "Demostración",
          "link": "https://marketing-digital-academia.vercel.app/",
          "preview": "https://youtu.be/QWK92JBAACg"
        },
        {
          "name": "Gestión de membresías",
          "description": "Demostración de una aplicación para consultar y administrar miembros y afiliaciones.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Multi-tenant",
            "Membership System",
            "Dashboards"
          ],
          "status": "Demostración",
          "link": "https://membership-system-fitness.vercel.app/",
          "preview": "https://youtu.be/x8HUsnPW0_k"
        },
        {
          "name": "Fidelización con QR y recompensas",
          "description": "Demostración de una aplicación para registrar visitas y consultar recompensas de clientes recurrentes.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Multi-tenant",
            "Membership System",
            "Dashboards"
          ],
          "status": "Demostración",
          "link": "https://app-fidelidad-barberia.vercel.app/",
          "preview": "https://youtu.be/mrQORiHabVs"
        }
      ]
    },
    "proyectos-ai-tools": {
      "title": "Herramientas con inteligencia artificial",
      "description": "Una selección de sitios, herramientas y demostraciones que muestran distintas formas de resolver necesidades con tecnología.",
      "projects": [
        {
          "name": "Contenido de productos con IA",
          "description": "Herramienta que utiliza imágenes e inteligencia artificial para preparar títulos y descripciones de productos.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Computer Vision",
            "SEO Automation",
            "E-commerce Tools"
          ],
          "status": "Publicado",
          "link": "https://ai-product-describer.vercel.app/",
          "preview": "https://youtu.be/dfK7F0Bf2LM"
        },
        {
          "name": "Asistente de diagnóstico de errores",
          "description": "Herramienta para interpretar errores y registros técnicos y preparar pasos de revisión.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Developer Tools",
            "Log Analysis",
            "Debugging Assistant"
          ],
          "status": "Publicado",
          "link": "https://ai-error-explainer-eight.vercel.app/",
          "preview": "https://youtu.be/tq6klSZjIgQ"
        },
        {
          "name": "Optimización de instrucciones para IA",
          "description": "Demostración de una herramienta que organiza contexto, objetivos y formato en una instrucción para modelos de IA.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Prompt Engineering",
            "LLM Tools",
            "Text Processing"
          ],
          "status": "Publicado",
          "link": "https://youtu.be/ZXxMrqALGAk",
          "preview": "https://youtu.be/ZXxMrqALGAk"
        }
      ]
    }
  },
  "en": {
"proyectos-experimentos": {
  "title": "Interface and motion experiments",
  "description": "Animation, interaction and design explorations created in CodePen.",
  "projects": experimentsEn
},
    "proyectos-sitios": {
      "title": "Website design and development",
      "description": "A selection of websites, tools and demonstrations showing different ways to address needs with technology.",
      "projects": [
        {
          "name": "Architecture website",
          "description": "A visual exploration of architectural projects with image-led content and navigation.",
          "tech": [
            "Next.js",
            "React",
            "SSG",
            "Tailwind CSS",
            "shadcn/ui",
            "Radix UI"
          ],
          "status": "Demonstration",
          "link": "https://ivanz88.sg-host.com/",
          "preview": "https://i.imgur.com/ZSqN1vt.gif"
        },
        {
          "name": "Marketing agency website",
          "description": "A website demonstration for presenting services, projects and a commercial offering.",
          "tech": [
            "Next.js",
            "React",
            "Supabase",
            "PostgreSQL",
            "Tailwind CSS",
            "shadcn/ui"
          ],
          "status": "Demonstration",
          "link": "https://marketing-web-template.vercel.app/",
          "preview": "https://youtu.be/Qn7HhzGG5Vc"
        },
        {
          "name": "Creative studio website",
          "description": "A web experience combining visual composition and motion to present a studio's work.",
          "tech": [
            "Next.js",
            "React",
            "GSAP",
            "Lenis",
            "Motion Design",
            "SSG"
          ],
          "status": "Demonstration",
          "link": "https://ivanz89.sg-host.com/",
          "preview": "https://youtu.be/-2bu2h-BvPo"
        },
        {
          "name": "Architectural photography gallery",
          "description": "A minimalist image gallery with a considered scrolling experience.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "GSAP",
            "Lenis",
            "Minimal UI"
          ],
          "status": "Demonstration",
          "link": "https://ivanz90.sg-host.com/",
          "preview": "https://youtu.be/8C29lbWuEvw"
        },
        {
          "name": "Interior design website",
          "description": "An interface demonstration for presenting interior design projects and visual content.",
          "tech": [
            "Next.js",
            "React",
            "Framer Motion",
            "Lenis",
            "Tailwind CSS",
            "shadcn/ui"
          ],
          "status": "Demonstration",
          "link": "https://ivanz90.sg-host.com/",
          "preview": "https://youtu.be/PZfKFIgPr1w"
        },
        {
          "name": "Real estate website with EasyBroker",
          "description": "An EasyBroker property integration in a WordPress website for browsing real estate listings.",
          "tech": [
            "WordPress",
            "Plugin Development",
            "API Integration",
            "Custom Post Types",
            "Data Mapping"
          ],
          "status": "Published",
          "link": "https://negocianterealestate.com/",
          "preview": "https://youtu.be/hjv3JFzTsJE"
        },
        {
          "name": "Restaurant website",
          "description": "A page presenting the dining offering, business information and contact options.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "Static Site",
            "OpenTable Integration",
            "UI Branding"
          ],
          "status": "Published",
          "link": "https://cienfuegos.mx/",
          "preview": "https://youtu.be/tvaE6EzjBPI"
        },
        {
          "name": "Restaurant interface experiment",
          "description": "A design and motion demonstration exploring a brand's visual presentation.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "GSAP",
            "Microinteractions",
            "Swiper.js"
          ],
          "status": "Demonstration",
          "link": "https://ivanz31.sg-host.com/",
          "preview": "https://youtu.be/o9kQovpPLWI"
        },
        {
          "name": "Free-navigation gallery",
          "description": "A visual gallery exploration with scrolling in two directions.",
          "tech": [
            "HTML",
            "CSS",
            "JavaScript",
            "GSAP",
            "Interactive Gallery",
            "2D Scrolling"
          ],
          "status": "Demonstration",
          "link": "https://ivanz87.sg-host.com/",
          "preview": "https://youtu.be/6d3KezAIlL0"
        }
      ]
    },
    "proyectos-apps": {
      "title": "Web application demonstrations",
      "description": "A selection of websites, tools and demonstrations showing different ways to address needs with technology.",
      "projects": [
        {
          "name": "Client reporting dashboard",
          "description": "A dashboard demonstration that organizes client reports and data for easier review.",
          "tech": [
            "Next.js",
            "React",
            "B2B SaaS",
            "Client Portals",
            "Dashboards",
            "Recharts"
          ],
          "status": "Demonstration",
          "link": "https://v0-panel-de-reportes-de-usuario.vercel.app/",
          "preview": "https://youtu.be/HgNfUpvru54"
        },
        {
          "name": "Beauty ecommerce demo",
          "description": "An online store demonstration focused on the catalog and shopping experience.",
          "tech": [
            "Next.js",
            "React",
            "E-commerce",
            "Visual UX",
            "Microinteractions",
            "Tailwind CSS"
          ],
          "status": "Demonstration",
          "link": "https://beauty-ecommerce-web.vercel.app/",
          "preview": "https://youtu.be/FwdRnqpphYA"
        },
        {
          "name": "Conversational finance demo",
          "description": "An interface demonstration for exploring financial information through AI conversations.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Conversational UI",
            "Finance App",
            "Dashboards"
          ],
          "status": "Demonstration",
          "link": "https://v0-portal-financiero-conversacional.vercel.app/",
          "preview": "https://youtu.be/HgNfUpvru54"
        },
        {
          "name": "Fashion ecommerce demo",
          "description": "An ecommerce experience demonstrating product presentation and catalog browsing.",
          "tech": [
            "Next.js",
            "React",
            "E-commerce",
            "GSAP",
            "Lenis",
            "Motion Design"
          ],
          "status": "Demonstration",
          "link": "https://ivanz92.sg-host.com/",
          "preview": "https://youtu.be/HnEAPewnPX0"
        },
        {
          "name": "Barber and beauty business demo",
          "description": "An application demonstration with appointment, customer and business workflows.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Booking System",
            "POS",
            "CRM"
          ],
          "status": "Demonstration",
          "link": "https://barber-shop-full-system.vercel.app/",
          "preview": "https://youtu.be/PflAV4jWCtI"
        },
        {
          "name": "Education platform demo",
          "description": "A platform demonstration with student, teacher and administrator views.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Role-based UI",
            "Dashboards",
            "Tailwind CSS"
          ],
          "status": "Demonstration",
          "link": "https://marketing-digital-academia.vercel.app/",
          "preview": "https://youtu.be/QWK92JBAACg"
        },
        {
          "name": "Membership management demo",
          "description": "An application demonstration for viewing and managing members and memberships.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Multi-tenant",
            "Membership System",
            "Dashboards"
          ],
          "status": "Demonstration",
          "link": "https://membership-system-fitness.vercel.app/",
          "preview": "https://youtu.be/x8HUsnPW0_k"
        },
        {
          "name": "QR loyalty and rewards demo",
          "description": "An application demonstration for recording visits and exploring repeat-customer rewards.",
          "tech": [
            "Next.js",
            "React",
            "Web App",
            "Multi-tenant",
            "Membership System",
            "Dashboards"
          ],
          "status": "Demonstration",
          "link": "https://app-fidelidad-barberia.vercel.app/",
          "preview": "https://youtu.be/mrQORiHabVs"
        }
      ]
    },
    "proyectos-ai-tools": {
      "title": "AI tools",
      "description": "A selection of websites, tools and demonstrations showing different ways to address needs with technology.",
      "projects": [
        {
          "name": "AI product content tool",
          "description": "A tool using images and AI to prepare product titles and descriptions.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Computer Vision",
            "SEO Automation",
            "E-commerce Tools"
          ],
          "status": "Published",
          "link": "https://ai-product-describer.vercel.app/",
          "preview": "https://youtu.be/dfK7F0Bf2LM"
        },
        {
          "name": "AI error diagnosis assistant",
          "description": "A tool for interpreting errors and technical logs and preparing review steps.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Developer Tools",
            "Log Analysis",
            "Debugging Assistant"
          ],
          "status": "Published",
          "link": "https://ai-error-explainer-eight.vercel.app/",
          "preview": "https://youtu.be/tq6klSZjIgQ"
        },
        {
          "name": "AI prompt optimization demo",
          "description": "A demonstration of a tool that organizes context, goals and output format into an AI instruction.",
          "tech": [
            "Next.js",
            "React",
            "AI Integration",
            "Prompt Engineering",
            "LLM Tools",
            "Text Processing"
          ],
          "status": "Published",
          "link": "https://youtu.be/ZXxMrqALGAk",
          "preview": "https://youtu.be/ZXxMrqALGAk"
        }
      ]
    }
  }
}


export function ProyectosSection({ type, locale }: { type: "proyectos-sitios" | "proyectos-apps" | "proyectos-ai-tools" | "proyectos-experimentos"; locale: Locale }) {
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
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground"><LayoutPanelTopIcon /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
          </div>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="text-muted-foreground text-sm">{data.description}</motion.p>
      </div>

      <div className="flex flex-col gap-4">
        {data.projects.map((project, i) => {
          const youtubePreviewUrl = getYouTubePreviewEmbedUrl(project.preview)
          const previewAlt = locale === "en" ? `Preview of ${project.name}` : `Vista previa de ${project.name}`
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
                    title={locale === "en" ? `Embed of ${project.name}` : `Vista de ${project.name}`}
                    className="h-[320px] w-full md:h-[420px]"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
                <div className="flex flex-col gap-3 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h2>
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
                      <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h2>
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









