import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("ai", "en")
export default function Page() {
  return <PortfolioPage id="ai" locale="en" />
}
