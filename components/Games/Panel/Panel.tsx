"use client"

import { Container, Button, Icon } from "semantic-ui-react"
import { fn } from "@/src/utils/functions"
import { GamesByPlatformPopulate } from "@/src/types"
import styles from "./Panel.module.scss"
import { serverHost } from "@/src/utils/serverHost"
import { WishListIcon } from "@/components/Utils/WishListIcon"

type PanelProps = {
  gameId: GamesByPlatformPopulate['id']
  game: GamesByPlatformPopulate['attributes']
}

export function Panel({ gameId, game}:PanelProps) {

  const buyPrice = fn.calcDiscountePrice(game.price, game.discount)

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <img 
          src={`${serverHost}${game.portada.data.attributes.url}`}
        />
      </div>
      <div className={styles.actionsContainer} >
        <div>
          <h2>{game.title}</h2>
          <div className={styles.moreInfo}>
            <span>
              <img src={`${serverHost}${game.platform.data.attributes.icon.data.attributes.url}`}/>
              {game.platform.data.attributes.title}
            </span>
            <span>
              <Icon name="check" />
              En stock
            </span>
          </div>
          <div className={styles.price} >
            { game.discount > 0 && (
              <>
                <span className={styles.originalPrice} >
                  <Icon name="tag"/>
                  {game.price}
                </span>

                <span className={styles.discount} >
                  -{game.discount}%
                </span>
              </>
            )}

            <span className={styles.price}>
              {fn.formatPrice(buyPrice)}
            </span>
          </div>
          <Button primary fluid>Comprar</Button>
          <WishListIcon 
            gameId={gameId}
            className={styles.heart}
          />
        </div>
      </div>
    </Container>
  )
}
