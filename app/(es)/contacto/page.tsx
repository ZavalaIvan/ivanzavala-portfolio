import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("contact", "es")
export default function Page() {
  return <PortfolioPage id="contact" locale="es" />
}
