import { Games } from "@/src/api";
import { redirect } from "next/navigation";
import { GridGames } from "@/components/Utils/GridGames";
import { PaginationUI } from "@/components/Utils/PaginationUI";
import { NotFoundUI } from "@/components/Utils/NotFoundUI";
import Separator from "@/components/Utils/Separator/Separator";

type SearchPageProps = {
    searchParams: {
        s: string
        page?: number
    }
}

const gameController = new Games()

async function getGamesSeacrh(text: string, page?:number) {
    try {
        const gamesSearch = await gameController.searchGames(text, page)
        return gamesSearch
    } catch (error) {
        console.log(error);
        redirect('/home')
    }
}

export default async function SearchPage({searchParams}: SearchPageProps) {

   const { meta, data} = await getGamesSeacrh(searchParams.s, searchParams.page)
   const hasResult = data.length > 0

  return (
    <>
        <Separator height={50}/>
        <h2>Buscando:  {searchParams.s} </h2>

        {
            hasResult ? (
                <>
                    <GridGames games={data}/>
                    <Separator height={30}/>
                    <PaginationUI totalPages={meta.pagination.pageCount}/>
                </>
            )
            :
            (
                <NotFoundUI text="No se encontraron resultados"/>
            )
        }
        <Separator height={100}/>
    </>
  )
}
