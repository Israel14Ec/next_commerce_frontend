import { fn } from "@/src/utils/functions"
import { PaypalButton } from "../PaypalButton" 
import { AddresT, GamesQuantity } from "@/src/types"
import styles from "./Resume.module.scss"

type ResumeProps = {
    games: GamesQuantity[]
    addressSelected?: AddresT
    totalPrice: number  
}

export function Resume({ games, totalPrice, addressSelected} : ResumeProps) {
    
    const invoice="Pedido de juegos"

    return (
    <div className={styles.resume} >
        <h2>Resumen</h2>
        <div className={styles.block} >
            <div className={styles.products} >
                {games.map((game) => (
                    <div key={game.id} className={styles.product} > 
                        <div>
                            <p> { game.attributes.title} </p>
                            <span> { game.attributes.platform.data.attributes.title} </span>
                        </div>

                        <span>
                            { game.quantity > 0 && `${game.quantity}x`}
                            { fn.formatPrice(fn.calcDiscountePrice(game.attributes.price, game.attributes.discount))}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className={styles.blockTotal} >
            <div>
                <span>Total</span>
                <span> {fn.formatPrice(totalPrice)} </span>
            </div>
        </div>

        {addressSelected && (
                <PaypalButton price={totalPrice} invoice={invoice} games={games} addressSelected={addressSelected} />
        )}

    </div>
  )
}
