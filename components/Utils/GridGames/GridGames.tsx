import Link from "next/link"
import { fn } from "@/src/utils/functions"
import { Label } from "@/components/Utils/Label"
import { GamesT } from "@/src/types"
import styles from "./GridGames.module.scss"
import { serverHost } from "@/src/utils/serverHost"
import { formatPrice } from "@/src/utils/functions/formatPrice"

type GridGamesProps = {
    games: GamesT[]
}

export function GridGames({ games } : GridGamesProps) {

  return (
    <div className={styles.gridGames} >
        {games.map((game) => (
            <Link key={game.id} href={`/home/${game.attributes.slug}`} className={styles.game} >
                <div>
                    <img src={`${serverHost}${game.attributes.portada.data.attributes.url}`} />
                    {game.attributes.discount > 0 && (
                        <Label.Discount className={styles.discount}>
                            {`- ${game.attributes.discount}$`}
                        </Label.Discount>
                    )}
                </div>

                <div>
                    <span> {game.attributes.title} </span>
                    <span className={styles.price}> 
                        {formatPrice(fn.calcDiscountePrice(game.attributes.price, game.attributes.discount))} 
                    </span>
                </div>
            </Link>
        ))}
    </div>
  )
}
