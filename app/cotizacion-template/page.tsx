import type { Metadata } from "next"
import { CotizacionTemplateSection } from "@/components/sections/cotizacion-template"

export const metadata: Metadata = {
  title: "Plantilla de cotización | Iván Zavala",
  description: "Plantilla visual de cotización con logo, contacto y estructura documental.",
}

export default function CotizacionTemplatePage() {
  return <CotizacionTemplateSection />
}
