import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("support", "es")
export default function Page() {
  return <PortfolioPage id="support" locale="es" />
}
