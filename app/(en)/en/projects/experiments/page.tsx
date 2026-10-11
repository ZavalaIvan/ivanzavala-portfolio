import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("experiments", "en")
export default function Page() {
  return <PortfolioPage id="experiments" locale="en" />
}
