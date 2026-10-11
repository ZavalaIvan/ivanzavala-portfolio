import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("websites", "en")
export default function Page() {
  return <PortfolioPage id="websites" locale="en" />
}
