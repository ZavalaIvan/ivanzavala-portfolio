"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Expand, X } from "lucide-react"
import type { ProjectScreenshot } from "@/lib/agent-projects"
import type { Locale } from "@/lib/site"

export function ProjectScreenshots({ images, locale }: { images: ProjectScreenshot[]; locale: Locale }) {
  const [selected, setSelected] = useState<ProjectScreenshot | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const en = locale === "en"

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !selected) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = "hidden"
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [selected])

  return <>
    <div className="grid gap-6">
      {images.map(image => <figure key={image.src} className="overflow-hidden rounded-xl border border-border bg-card">
        <button type="button" onClick={() => setSelected(image)} aria-label={`${en ? "Enlarge screenshot" : "Ampliar captura"}: ${image.alt}`} className="group relative block w-full bg-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <div className={image.portrait ? "mx-auto aspect-[330/510] max-w-[360px] overflow-hidden bg-white" : "aspect-[1366/543] overflow-hidden"}>
            <Image src={image.src} alt={image.alt} width={1366} height={543} unoptimized className="h-full w-full object-cover" />
          </div>
          <span aria-hidden="true" className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/80 px-3 py-2 text-xs font-medium text-white transition-colors group-hover:bg-black"><Expand className="h-3.5 w-3.5" />{en ? "Enlarge" : "Ampliar"}</span>
        </button>
        <figcaption className="px-5 py-4 text-sm leading-relaxed text-muted-foreground">{image.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialogRef} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null) }} aria-label={en ? "Project screenshot" : "Captura del proyecto"} className="fixed inset-0 m-auto max-h-[94dvh] w-[calc(100%-2rem)] max-w-[1400px] overflow-auto rounded-xl border border-border bg-card p-4 text-foreground backdrop:bg-black/85 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4"><p className="text-sm leading-relaxed">{selected?.caption}</p><button type="button" onClick={() => setSelected(null)} aria-label={en ? "Close screenshot" : "Cerrar captura"} className="shrink-0 rounded-md border border-border p-2 hover:bg-accent"><X className="h-5 w-5" /></button></div>
      {selected && <div className={selected.portrait ? "mx-auto aspect-[330/510] w-[min(360px,45dvh)] max-w-full overflow-hidden bg-white" : "overflow-auto rounded-md bg-[#171717]"}><Image src={selected.src} alt={selected.alt} width={1366} height={543} unoptimized className={selected.portrait ? "h-full w-full object-cover" : "h-auto w-full"} /></div>}
    </dialog>
  </>
}
