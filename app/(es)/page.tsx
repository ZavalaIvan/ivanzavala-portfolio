import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("home", "es")
export default function Page() {
  return <PortfolioPage id="home" locale="es" />
}
