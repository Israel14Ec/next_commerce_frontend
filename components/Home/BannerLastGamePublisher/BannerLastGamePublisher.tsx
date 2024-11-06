"use client"

import Link from "next/link"
import { Container, Image } from "semantic-ui-react"
import { DateTime } from "luxon"
import { useState, useEffect } from "react"
import { Games } from "@/src/api"
import { GamesT } from "@/src/types"
import { fn } from "@/src/utils/functions"
import { Label } from "@/components/Utils/Label"
import styles from "./BannerLastGamePublisher.module.scss"

const gamesController = new Games()

export function BannerLastGamePublisher() {

  const [game, setGame] = useState({} as GamesT)

  useEffect(() => {
    (async () => {
      try {
        const data = await gamesController.getLastPublished()
        setGame(data)                
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])
  
  if(!Object.keys(game).length) return null

  const wallpaper = game.attributes.wallpaper
  const releaseDate =DateTime.fromISO(new Date(game.attributes.releaseDate).toISOString()).minus({ days: 1}).toRelative()
  const price = fn.calcDiscountePrice(game.attributes.price, game.attributes.discount)
    
  return (
    <div className={styles.container} >
        <Image 
          src={`http://localhost:1337${wallpaper.data.attributes.url}`}
          className={styles.wallpaper}
        />

        <Link 
          className={styles.infoContainer}
          href={`/${game.attributes.slug}`}  
        >
          <Container>
            <span className={styles.date} > 
              {releaseDate} 
            </span>
            <h2> {game.attributes.title} </h2>
            <p className={styles.price} >
              <Label.Discount>
                {game.attributes.discount} %
              </Label.Discount>
              <span className={styles.finalPrice} >
                { fn.formatPrice(price)}
              </span>
            </p>
          </Container>
        </Link>
    </div>
  )
}