import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("nora", "es")
export default function Page() {
  return <PortfolioPage id="nora" locale="es" />
}
