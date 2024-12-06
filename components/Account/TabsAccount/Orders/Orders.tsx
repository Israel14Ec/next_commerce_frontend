import { useState, useEffect } from "react"
import { Order } from "@/src/api"
import { NotFoundUI } from "@/components/Utils/NotFoundUI"
import { useAuth } from "@/src/Hooks"
import { OrderT } from "@/src/types"
import { Order as OrderUI } from "./Order"

const orderCtrl = new Order()

export function Orders() {

    const [orders, setOrders] = useState<OrderT[]>([])
    const { user} = useAuth()

    useEffect(() => {
        //Función anonima
        (async () => {
            try {
                const response = await orderCtrl.getAll(user.id)
                setOrders(response)

            } catch (error) {
                throw error
            }
        })() 
    }, [])

    if(!orders.length) return (
        <NotFoundUI 
            text="No tienes ningún producto comprado"
        />
    )

    return (
    <div>
        {orders.map((order) => (
            <OrderUI 
                key={order.id}
                order={order}
            />
        ))}
    </div>
  )
}
