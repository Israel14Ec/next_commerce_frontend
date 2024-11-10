"use client"

import Link from "next/link"
import { Button, Container } from "semantic-ui-react"
import styles from "./BannerAd.module.scss"

type BannerAdProps = {
    title: string
    subtitle: string
    btnTitle: string
    btnLink: string
    image: string
}

export function BannerAd( { title, subtitle, btnTitle, btnLink, image } : BannerAdProps) {

  return (
    <div className={styles.container} >
        <Container className={styles.containerImage}>
            <img src={image} alt="Imagen" />
        </Container>
        <div className={styles.infoContainer} >
            <Container>
                <h2> { title } </h2>
                <h3> {subtitle} </h3>

                <Button as={Link} href={btnLink} primary>
                    {btnTitle}
                </Button>
            </Container>
        </div>
    </div>
  )
}
