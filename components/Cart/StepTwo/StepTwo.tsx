import { useState, useMemo } from "react"
import { AddresT, GamesQuantity } from "@/src/types"
import { Addresses } from "./Addresses"
import Separator from "@/components/Utils/Separator/Separator"
import styles from "./StepTwo.module.scss"
import { Resume } from "./Resume"
import { fn } from "@/src/utils/functions"

type StepTwoProps = {
    games: GamesQuantity[] | undefined
}

export function StepTwo({games}: StepTwoProps) {

    const totalPrice = useMemo( () => games?.reduce((acc, game) => acc + (game.quantity * fn.calcDiscountePrice(game.attributes.price, game.attributes.discount)), 0),[games])
    const [addressSelected, setAddressSelected] = useState<AddresT>() //Estado para definir que dirección se selecciono
    if(games === undefined ) return null
    if(!games.length) return null

  return (
    <div className={styles.stepTwo} >
        <div className={styles.center} >
            <Addresses addressSelected={addressSelected} setAddressSelected={setAddressSelected} />
            <Separator height={50}/>
        </div>

        <div className={styles.right} >
            <Resume games={games} addressSelected={addressSelected} totalPrice={totalPrice || 0}/>
        </div>
    </div>
  )
}
