import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("webapps", "es")
export default function Page() {
  return <PortfolioPage id="webapps" locale="es" />
}
