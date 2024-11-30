"use client"

import { useState ,useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "semantic-ui-react";
import { useCart } from "@/src/Hooks";
import { Games } from "@/src/api";
import { GamesQuantity } from "@/src/types";
import { Cart } from "@/components/Cart"
import { Spinner } from "@/components/Utils/Spinner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAuth } from "@/src/Hooks";  

const gamesCtrl = new Games()

export default function CartPage() {

  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currenStep = +searchParams.get('step')! || 1
  const [games, setGames] = useState<GamesQuantity[]>()
  const [loading, setLoading] = useState(false)
  const { cart } = useCart()
  const { user, loading : loadingUser} = useAuth()

  useEffect(() => {
    if (currenStep < 0 || currenStep > 2) router.push("/cart?step=1");
  }, [currenStep])

  useEffect(() => {
    if (!loadingUser && !Object.keys(user).length) {
        router.push("/join/sign-in")
    }

}, [loadingUser, user]); 


  useEffect(() => {

    if(!cart.length) {
      setGames([])
      return
    } 

    (async () => {
      try {
        setLoading(false)
        const data = []

        for await (const item of cart) {
          const response = await gamesCtrl.getGameById(item.id) //Se realiza la consulta
          data.push({...response, quantity: item.quantity}) //Agrego el valor de quantity
        }
        setGames(data)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    })()
  }, [cart])

  if(loading) return <Spinner/>
  
  return (
    <PayPalScriptProvider options={{clientId: process.env.NEXT_PUBLIC_CLIENTID_PAYPAL!}}>
      <Container>
        {currenStep === 1 && <Cart.StepOne games={games}/>}
        {currenStep === 2 && <Cart.StepTwo games={games}/> }

      </Container>
    </PayPalScriptProvider>
  );
}
