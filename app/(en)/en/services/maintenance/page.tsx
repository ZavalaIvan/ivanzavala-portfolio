import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("support", "en")
export default function Page() {
  return <PortfolioPage id="support" locale="en" />
}
