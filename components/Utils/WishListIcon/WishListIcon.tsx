"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/src/Hooks"
import { WishList } from "@/src/api"
import { Icon } from "semantic-ui-react"
import { GamesT, WishListT } from "@/src/types"
import styles from "./WishListIcon.module.scss"
import { toast } from "react-toastify"

type WishListIconProps = {
    gameId: GamesT["id"]
    className?: string
    removeCallback?: () => void
}

const wishController = new WishList()

export function WishListIcon({gameId, className, removeCallback}:WishListIconProps) {

  const [hasWishList, setHasWishList] = useState(false)
  const [wishList, setWishList] = useState<WishListT>({} as WishListT)
  const { user, loading} = useAuth()

  const addWishList = async () => {
    try {
      if(Object.keys(user).length) {
        const data = await wishController.add(user.id, gameId)
        setHasWishList(Object.keys(data).length > 0)
        setWishList(data)
        return 
      }
  
      toast.error("Inicie sesesión para agregar este juego a la lista de favoritos")

    } catch (error) {
      console.error(error);
      toast.error("Algo salió mal no se pudo agregar")
    }
    
  }

  const deleteWhisList = async () => {
    try {
      if(wishList?.id) {
        await wishController.delete(wishList.id)
        setHasWishList(false)
        setWishList({} as WishListT)

        if(removeCallback) {
          removeCallback()
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Algo salió mal no se pudo añadir a favoritos')
    }
  }

  useEffect(() => {
    ( async () => {
      try {
        if(loading === false && Object.keys(user).length) {
          const data = await wishController.check(user.id, gameId)  
          setHasWishList(data.length > 0)  
          setWishList(data[0])
        }
      } catch (error) {
        setHasWishList(false)
        console.error(error);
      }
    })()
  }, [gameId, loading])
  
  return (
    <Icon
        name={hasWishList ? "heart" : "heart outline"}
        onClick = { hasWishList ? deleteWhisList : addWishList}
        className={`${styles.WishListIcon} ${className ? className : ''}`}
    />
  )
}
