import "server-only"
import { readFileSync } from "node:fs"
import { join } from "node:path"

// Fixed, reviewed public source files only. Never accepts a URL or visitor-supplied path.
const publicSourceFiles = {
  support: "lib/agent-prototypes/support.ts",
  booking: "lib/agent-prototypes/booking.ts",
  connectors: "lib/agent-prototypes/connectors.ts",
  tools: "lib/agent-prototypes/tool-contracts.ts",
} as const

export function prototypeSource(file: keyof typeof publicSourceFiles, section: string) {
  const source = readFileSync(join(process.cwd(), publicSourceFiles[file]), "utf8")
  const marker = `// showcase:start ${section}\n`
  const normalized = source.replace(/\r\n/g, "\n")
  const start = normalized.indexOf(marker)
  const end = normalized.indexOf(`// showcase:end ${section}`, start)
  if (start < 0 || end < 0) throw new Error(`Missing public source excerpt: ${section}`)
  return { path: publicSourceFiles[file], code: normalized.slice(start + marker.length, end).trim() }
}
