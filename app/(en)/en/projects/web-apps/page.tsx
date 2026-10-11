import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("webapps", "en")
export default function Page() {
  return <PortfolioPage id="webapps" locale="en" />
}
