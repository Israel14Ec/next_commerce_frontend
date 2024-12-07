import { HeaderWallpaper, Info, Panel } from "@/components/Games";
import Media from "@/components/Games/Media/Media";
import Separator from "@/components/Utils/Separator/Separator";
import { Games } from "@/src/api";
import { Metadata } from "next";

type GamePageProps = {
    params: {
        game: string
    }
}

export async function generateMetadata({params} : GamePageProps) :Promise<Metadata> {
    return {
        title:`Juego: ${params.game}`,
        description: `Datos del juego ${params.game}`
    }
}

const gameController = new Games()

export default async function GamePage({params} : GamePageProps) {
    
    const game = await gameController.getGameBySlug(params.game)

  return (
    <>
        <HeaderWallpaper
            image={game.attributes.wallpaper.data.attributes.url}
        />
        <Panel 
            gameId={game.id}
            game={game.attributes}
        />

        <Separator height={50}/>

        {/**Info de games */}
        <Info game={game.attributes}/>
        <Separator height={30}/>
        <Media 
            video={game.attributes.video}
            screenshots={game.attributes.screenshots.data}
        />
        <Separator height={50}/>
    </>
  )
}
