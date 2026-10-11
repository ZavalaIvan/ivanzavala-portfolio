import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("about", "en")
export default function Page() {
  return <PortfolioPage id="about" locale="en" />
}
