import { PrototypePreview } from "@/components/sections/prototype-projects"
import { pageMetadata } from "@/lib/site"

export const metadata = { ...pageMetadata("bookingAgent", "en"), robots: { index: false, follow: true } }
export default function Page() { return <PrototypePreview id="bookingAgent" locale="en" /> }
