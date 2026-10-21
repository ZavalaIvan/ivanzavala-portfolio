import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("agents", "en")
export default function Page() {
  return <PortfolioPage id="agents" locale="en" />
}
