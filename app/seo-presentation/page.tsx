import type { Metadata } from "next"
import { SeoPresentationSection } from "@/components/sections/seo-presentation"

export const metadata: Metadata = {
  title: "Presentación SEO | Iván Zavala",
  description: "Presentación breve de servicios SEO: qué es, por qué importa y qué incluye exactamente.",
}

export default function SeoPresentationPage() {
  return <SeoPresentationSection />
}
