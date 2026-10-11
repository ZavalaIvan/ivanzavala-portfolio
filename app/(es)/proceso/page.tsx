import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("methodology", "es")
export default function Page() {
  return <PortfolioPage id="methodology" locale="es" />
}
