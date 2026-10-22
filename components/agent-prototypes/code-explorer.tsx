"use client"

import { useState } from "react"
import { Check, Copy, FileCode2, Github } from "lucide-react"
import type { Locale } from "@/lib/site"

export type SourceExcerpt = { id: string; title: string; path: string; code: string; description: string; status: string }
function highlight(line: string) {
  return line.split(/(\/\/[^\n]*|"(?:\\.|[^"\\])*"|`[^`]*`|\b(?:export|async|await|function|const|return|if|throw|new|as|type)\b)/g).map((part,index) => <span key={index} className={part.startsWith("//") ? "text-[#81918e]" : /^["`]/.test(part) ? "text-[#d9c58e]" : /^(export|async|await|function|const|return|if|throw|new|as|type)$/.test(part) ? "text-[#b1bffa]" : undefined}>{part}</span>)
}

export function CodeExplorer({ excerpts, locale }: { excerpts: SourceExcerpt[]; locale: Locale }) {
  const [active, setActive] = useState(excerpts[0].id)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const excerpt = excerpts.find(item => item.id === active) ?? excerpts[0]
  const en = locale === "en"
  async function copy() { try { await navigator.clipboard.writeText(excerpt.code); setCopied(true); setCopyError(false) } catch { setCopyError(true) } }
  return <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-[#111919] text-[#d4ded9]">
    <div className="flex flex-wrap gap-1 border-b border-white/10 bg-[#182221] p-2" aria-label={en ? "Choose a source excerpt" : "Elige un fragmento de código"}>{excerpts.map(item => <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => { setActive(item.id); setCopied(false); setCopyError(false) }} className={`rounded-md px-3 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5ebcc] ${active === item.id ? "bg-white/10 text-white" : "text-[#9aada3] hover:bg-white/5"}`}>{item.title}</button>)}</div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3"><span className="inline-flex min-w-0 items-center gap-2 break-all text-[11px] font-mono text-[#9aada3]"><FileCode2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />{excerpt.path}</span><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded border border-white/15 px-2 py-1.5 text-[11px] hover:bg-white/10">{copied ? <Check aria-hidden="true" className="h-3 w-3" /> : <Copy aria-hidden="true" className="h-3 w-3" />}{copied ? (en ? "Copied" : "Copiado") : (en ? "Copy" : "Copiar")}</button></div>
    <div className="border-b border-white/10 px-4 py-3"><p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-[#a5ebcc]">{excerpt.status}</p><p className="text-xs leading-relaxed text-[#a7b8b4]">{excerpt.description}</p>{copyError && <p role="status" className="mt-2 text-xs">{en ? "Select the code to copy it manually." : "Selecciona el código para copiarlo manualmente."}</p>}</div>
    <pre tabIndex={0} aria-label={excerpt.title} className="max-h-[32rem] overflow-auto p-4 text-[11px] leading-6 outline-offset-[-2px] sm:text-xs"><code>{excerpt.code.split("\n").map((line,index) => <span key={index} className="table-row"><span aria-hidden="true" className="table-cell select-none pr-5 text-right text-[#63786c]">{index + 1}</span><span className="table-cell">{highlight(line)}{"\n"}</span></span>)}</code></pre>
    <a href={`https://github.com/ZavalaIvan/ivanzavala-portfolio/blob/main/${excerpt.path}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-xs text-[#a7b8b4] hover:text-white"><Github aria-hidden="true" className="h-4 w-4" />{en ? "Read the complete file on GitHub" : "Ver el archivo completo en GitHub"}</a>
  </div>
}
