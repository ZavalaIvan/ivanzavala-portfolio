import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("software", "en")
export default function Page() {
  return <PortfolioPage id="software" locale="en" />
}
