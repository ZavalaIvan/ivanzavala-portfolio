import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { SiteDocument } from "@/components/site-document"
import { siteUrl } from "@/lib/site"

export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: "Iván Zavala", icons: { icon: "/logo-ivan-zavala.jpg", shortcut: "/logo-ivan-zavala.jpg", apple: "/logo-ivan-zavala.jpg" } }
export const viewport: Viewport = { themeColor: "#0a0a0a" }
export default function Layout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>
}
