import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("aitools", "en")
export default function Page() {
  return <PortfolioPage id="aitools" locale="en" />
}
