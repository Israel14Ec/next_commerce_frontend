import { Info, TabsAccount } from "@/components/Account"
import { Metadata } from "next"

export const metadata : Metadata = {
  title: "NextCommerce - Mi cuenta",
  description: "Carrito de compra  del usuario"
}

export default function Account () {
  return (
    <div>
        <Info />
        <TabsAccount/>
    </div>
  )
}
