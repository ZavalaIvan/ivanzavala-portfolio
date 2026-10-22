import { PrototypePreview } from "@/components/sections/prototype-projects"
import { pageMetadata } from "@/lib/site"

export const metadata = { ...pageMetadata("supportAgent", "es"), robots: { index: false, follow: true } }
export default function Page() { return <PrototypePreview id="supportAgent" locale="es" /> }
