"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function Logo3D({ alt = "Logotipo 3D de Iván Zavala" }: { alt?: string }) {
  const [ready, setReady] = useState(false)
  const modelRef = useRef<HTMLElement | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const originalColorsRef = useRef<Map<number, [number, number, number, number]>>(new Map())

  useEffect(() => {
    let cancelled = false

    const loadModelViewerScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
        if (existing) {
          if ((window as any).customElements?.get("model-viewer")) {
            resolve()
            return
          }
          existing.addEventListener("load", () => resolve(), { once: true })
          existing.addEventListener("error", () => reject(new Error(`No se pudo cargar ${src}`)), { once: true })
          return
        }

        const script = document.createElement("script")
        script.type = "module"
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`No se pudo cargar ${src}`))
        document.head.appendChild(script)
      })

    const ensureModelViewer = async () => {
      if (!(window as any).customElements?.get("model-viewer")) {
        const sources = [
          "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js",
          "https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js",
        ]

        let loaded = false
        for (const src of sources) {
          try {
            await loadModelViewerScript(src)
            loaded = true
            break
          } catch {
            // intenta la siguiente CDN
          }
        }

        if (!loaded) return
      }

      await (window as any).customElements.whenDefined("model-viewer")
      if (!cancelled) setReady(true)
    }

    ensureModelViewer().catch(() => {
      // fallback silencioso: mantiene placeholder si no hay red/CDN
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const model = modelRef.current as (HTMLElement & { loaded: boolean }) | null
    if (!model) return

    let frame = 0
    let resetZoom: ReturnType<typeof setTimeout> | undefined
    let currentAngle = 0
    let targetAngle = 0
    let currentZoom = 1
    let targetZoom = 1
    let lastScrollY = window.scrollY
    let lastWheelAt = -Infinity
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const animate = () => {
      frame = 0
      if (!model.loaded || document.hidden || !model.getClientRects().length) return

      const settled = Math.abs(targetAngle - currentAngle) < 0.05 && Math.abs(targetZoom - currentZoom) < 0.001
      currentAngle = settled ? targetAngle : currentAngle + (targetAngle - currentAngle) * 0.18
      currentZoom = settled ? targetZoom : currentZoom + (targetZoom - currentZoom) * 0.12
      model.setAttribute("orientation", `${(currentAngle % 360).toFixed(2)}deg 0deg 0deg`)
      model.setAttribute("camera-orbit", `0deg 75deg ${(4.5 / currentZoom).toFixed(3)}m`)
      if (!settled) frame = requestAnimationFrame(animate)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(animate)
    }
    const rotate = (delta: number) => {
      if (!delta || reducedMotion.matches) return
      targetAngle += delta * 0.6
      targetZoom = 1.65
      if (resetZoom) clearTimeout(resetZoom)
      resetZoom = setTimeout(() => { targetZoom = 1; schedule() }, 160)
      schedule()
    }
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      lastWheelAt = performance.now()
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      rotate(event.deltaY * unit)
    }
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      // Wheel input already accounts for its scroll; this covers touch and keyboard.
      if (performance.now() - lastWheelAt > 200) rotate(delta)
    }
    const onVisibilityChange = () => {
      lastScrollY = window.scrollY
      if (!document.hidden) schedule()
    }
    model.addEventListener("load", schedule)
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibilityChange)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      if (resetZoom) clearTimeout(resetZoom)
      model.removeEventListener("load", schedule)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [ready])

  useEffect(() => {
    if (!ready) return

    const mv: any = modelRef.current
    if (!mv) return

    const applyMaterialTheme = () => {
      const materials = mv?.model?.materials as any[] | undefined
      if (!materials?.length) return

      materials.forEach((mat, index) => {
        const pbr = mat?.pbrMetallicRoughness
        if (!pbr?.setBaseColorFactor || !pbr?.baseColorFactor) return

        if (!originalColorsRef.current.has(index)) {
          const base = pbr.baseColorFactor as [number, number, number, number]
          originalColorsRef.current.set(index, [base[0], base[1], base[2], base[3]])
        }

        if (isDark) {
          pbr.setBaseColorFactor([1, 1, 1, 1])
        } else {
          const original = originalColorsRef.current.get(index)
          if (original) pbr.setBaseColorFactor(original)
        }
      })
    }

    if (mv.model) {
      applyMaterialTheme()
      return
    }

    mv.addEventListener("load", applyMaterialTheme, { once: true })
    return () => mv.removeEventListener("load", applyMaterialTheme)
  }, [ready, isDark, modelRef])

  if (!ready) {
    return (
      <img
        src="/logo-ivan-zavala.jpg"
        alt={alt}
        style={{
          width: 56,
          height: 56,
          borderRadius: 6,
          objectFit: "cover",
          display: "block",
        }}
      />
    )
  }

  return (
    // @ts-ignore
    <model-viewer
      src="/3d/logo-ivan-zavala.glb"
      alt={alt}
      className="h-14 w-14 rounded-sm"
      scale="0.02 0.02 0.02"
      reveal="auto"
      loading="eager"
      camera-target="auto auto auto"
      camera-orbit="0deg 75deg 4.5m"
      min-camera-orbit="auto auto 2.5m"
      max-camera-orbit="auto auto 7m"
      camera-controls
      disable-zoom
      disable-pan
      interaction-prompt="none"
      environment-image="neutral"
      exposure={isDark ? "1.65" : "1.4"}
      shadow-intensity={isDark ? "0.08" : "0.6"}
      shadow-softness={isDark ? "1.6" : "1"}
      auto-play
      ref={modelRef}

      style={{
        width: 56,
        height: 56,
        background: "transparent",
        filter: "none",
        display: "block",
        overflow: "visible",
        transformStyle: "flat",
        zIndex: 20,
      }}
    />
  )
}
