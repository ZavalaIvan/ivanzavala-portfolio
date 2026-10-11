import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("websites", "es")
export default function Page() {
  return <PortfolioPage id="websites" locale="es" />
}
