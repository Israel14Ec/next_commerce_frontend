import { Home } from "@/components/Home"
import Separator from "@/components/Utils/Separator/Separator"

export default function HomePage() {
  return (
    <>
      {/** SEO */}
      
      <Home.BannerLastGamePublisher />
      <Separator height={100}/>
    </>
  )
}
