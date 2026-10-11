import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("projects", "en")
export default function Page() {
  return <PortfolioPage id="projects" locale="en" />
}
