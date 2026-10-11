import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("automation", "es")
export default function Page() {
  return <PortfolioPage id="automation" locale="es" />
}
