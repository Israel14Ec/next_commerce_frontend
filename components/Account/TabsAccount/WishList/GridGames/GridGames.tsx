import Link from "next/link"
import { WishListWithGame } from "@/src/types"
import { Label } from "@/components/Utils/Label"
import { WishListIcon } from "@/components/Utils/WishListIcon"
import { fn } from "@/src/utils/functions"
import styles from "./GridGames.module.scss"
import { serverHost } from "@/src/utils/serverHost"

type GridGamesProps = {
  wishesList: WishListWithGame[]
  onReload: () => void
}

export function GridGames({wishesList, onReload} : GridGamesProps) {
  return (
    <div className={styles.gridGames} >

      {wishesList.map((wish) => {
        const game = wish.attributes.game.data
        const cover = game.attributes.portada.data.attributes.url

        return (
          <div key={wish.id} className={styles.game} >
            <Link href={`/home/${game.attributes.slug}`}>
              <div>
                <img src={`${serverHost}${cover}`} />

                { game.attributes.discount > 0 && (
                  <Label.Discount className={styles.discount} >
                    {`-${game.attributes.discount}$`}
                  </Label.Discount>
                )}
                
              </div>

              <div>
                <span>{game.attributes.title}</span>
                <span className={styles.price} >
                  {fn.formatPrice(fn.calcDiscountePrice(game.attributes.price, game.attributes.discount))}
                </span>
              </div>
            </Link>

            <WishListIcon 
              gameId={game.id}
              className={styles.wishListIcon}
              removeCallback={onReload}
            />
          </div>
        )
      })}
    </div>
  )
}
