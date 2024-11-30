"use client"

import { useState,createContext, ReactNode, useEffect } from "react"
import { CartT, GamesT } from "../types"
import { Cart } from "@/src/api"

type CartContextProps = {
    addCart: (gameId: GamesT['id']) => void
    total: number
    cart: CartT[]
    changeQuantityItem: (gameId: GamesT['id'], quantity:number) => void
    deleteItem: (gameId: GamesT['id']) => void 
    deleteAllItems: () => void
}

const cartCtrl = new Cart()

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({children}: {children: ReactNode}) {

    const [total, setTotal] = useState(cartCtrl.count())
    const [cart, setCart] = useState<CartT[]>([] as CartT[])

    useEffect(() => {
       try {
        const cart = cartCtrl.getAll()
        setCart(cart)
       } catch (error) {
        console.log("Error: ", error);
       }
    }, [])
    
    
    const addCart = (gameId: GamesT['id']) => {
        cartCtrl.add(gameId)
        refreshTotalCart()
    }

    const changeQuantityItem = (gameId: GamesT['id'], quantity:number) => {
        cartCtrl.changeQuantity(gameId, quantity)
        refreshTotalCart()
    }

    const refreshTotalCart = () => {
        const response = cartCtrl.getAll()
        setTotal(cartCtrl.count())
        setCart(response)
    }

    const deleteItem = (gameId: GamesT['id'])=> {
        cartCtrl.delete(gameId)
        refreshTotalCart()
    }
    
    const deleteAllItems = () => {
        cartCtrl.deleteAll()
        refreshTotalCart()
    }

    return (
        <CartContext.Provider value={{addCart, total, cart, changeQuantityItem, deleteItem, deleteAllItems}} >
            {children}
        </CartContext.Provider>
    )
}