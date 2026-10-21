import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("carsa", "es")
export default function Page() {
  return <PortfolioPage id="carsa" locale="es" />
}
