import { useState, useEffect } from "react"
import { WishList as WishListCtrl } from "@/src/api"
import { useAuth } from "@/src/Hooks"
import { WishListWithGame } from "@/src/types"
import { NotFoundUI } from "@/components/Utils/NotFoundUI"
import { GridGames } from "./GridGames"

const wishListCtrl = new WishListCtrl()

export function WishList() {

    const [wishList, setWishList] = useState<WishListWithGame[]>([])
    const [reload, setReload] = useState(false)
    const { user} = useAuth()

    const onReload = () => setReload(!reload)

    useEffect(() => {
      (async () => {
        try {
            const data = await wishListCtrl.getAll(user.id)
            setWishList(data)
        } catch (error) {
            console.error(error);
        }
      })()
    }, [reload])
    
    
    if(!wishList.length) return <NotFoundUI text="No hay juegos en la lista"/>

  return (
    <div>
        <h2>Lista de deseos</h2>
        <GridGames wishesList={wishList} onReload={onReload}/>
    </div>
  )
}
