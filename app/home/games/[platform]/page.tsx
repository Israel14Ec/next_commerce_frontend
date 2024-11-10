//Componente del lado del servidor (Server Component)

import { Platform, Games } from "@/src/api";
import { GamesT, Pagination, PlatformType } from "@/src/types";
import { GamesPlatform } from "@/components/Games";
import Separator from "@/components/Utils/Separator/Separator";
import { GridGames } from "@/components/Utils/GridGames";
import { redirect } from "next/navigation";
import { NotFoundUI } from "@/components/Utils/NotFoundUI";
import { PaginationUI } from "@/components/Utils/PaginationUI";

type PlatformPageProps = {
    params: {
        platform: string
    },
    searchParams?: {
        page: number
    }
}

const platformController = new Platform()
const gamesPlatform = new Games()

//Función para llamar a la plataforma y los juegos
let platform = {} as PlatformType
let games = [] as GamesT[]
let pagination = {} as Pagination

async function getGamesByPlatform(platformSlug:string, searchParams?:number) {
    try {
        platform = await platformController.getBySlug(platformSlug)
        if(platform === undefined) {
            throw new Error("No se pudo obtener la información")
        }
        
        const response = await gamesPlatform.getGamesByPlatform(platformSlug, searchParams)
        games = response.data
        pagination = response.meta.pagination
        
    } catch (error) {
        console.error(error);
        redirect('/home')
    }    
}

export default async function PlatformPage( {params, searchParams} : PlatformPageProps) {

    await getGamesByPlatform(params.platform, searchParams?.page)
    const hasProducts = games.length > 0    

  return (
    <>
        <GamesPlatform>
            <Separator height={50}/>
            <h2>{platform.attributes.title}</h2>
            
            { hasProducts ? (
                    <>
                        <GridGames games={games}/>
                        <Separator height={30}/>
                        <PaginationUI totalPages={pagination.pageCount}/>
                    </>
                )
                :
                (
                    <NotFoundUI text={`No hay resultados para ${platform.attributes.title}`}/>
                )

            }

            <Separator height={100}/>
        </GamesPlatform>
    </>
  )
}
