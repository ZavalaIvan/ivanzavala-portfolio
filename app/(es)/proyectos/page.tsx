import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("projects", "es")
export default function Page() {
  return <PortfolioPage id="projects" locale="es" />
}
