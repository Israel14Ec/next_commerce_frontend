import { Home } from "@/components/Home"
import { BannerAd } from "@/components/Utils/BannerAd"
import { BarTrust } from "@/components/Utils/BarTrust"
import Separator from "@/components/Utils/Separator/Separator"
import { Metadata } from "next"

const platformId = {
  playStation: 1,
  xbox: 2,
  nintendo: 3,
  pc: 4
}

//El Metadata se usa en server component
export const metadata: Metadata = {
  title: "NextCommerce - Gaming",
  description: "Descubre los mejores juegos para cada plataforma.",
};

export default function HomePage() {
  return (
    <>
      {/** SEO */}
      <Home.BannerLastGamePublisher />
      <Separator height={100}/>
      <Home.LatestGames title="Ultimos lanzamientos"/>
      <Separator height={100}/>
      <BarTrust/>

      <Home.LatestGames 
        title="PlayStation"
        limit={3} 
        platformId={platformId.playStation}
      />
      <Separator height={100}/>

      <Separator height={100}/>
      <BannerAd 
        title="Rregistrate y obten los mejores precios"
        subtitle="Elige tu juego favoritoooo!!"
        btnTitle="Entrar ahora"
        btnLink="/home/account"
        image="/image/img01.png"
      />
      <Separator height={50}/>
      <Home.LatestGames 
        title="Xbox"
        limit={3} 
        platformId={platformId.xbox}
      />
      <Separator height={100}/>
    </>
  )
}
