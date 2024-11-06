"use client"

import Link from "next/link"
import { Button, Container } from "semantic-ui-react"
import styles from "./Footer.module.scss"

export function Footer() {

  const dateYear = new Date().getFullYear()

  return (
    <div className={styles.footer} >
      <Container>
        <div className={styles.column} >
          <div>
            <Link href="/home">
              <img src="/image/logo.png" alt="Gaming shop"/>
            </Link>
          </div>
          <div>
            <ul>
              <Link href={"#"}>
                Terminos y condiciones
              </Link>
              <Link href={"#"}>
                Política de privacidad
              </Link>
              <Link href={"#"}>
                Contacto
              </Link>
              <Link href={"#"}>
                FAQ
              </Link>
            </ul>
          </div>
          <div className={styles.social}>
            <Button as="a" href="#" circular color="facebook" icon="facebook"/>
            <Button as="a" href="#" circular color="twitter" icon="twitter"/>
            <Button as="a" href="#" circular color="youtube" icon="youtube"/>
            <Button as="a" href="#" circular color="instagram" icon="instagram"/>
          </div>
        </div>

        <div className={styles.copyright}>
          <span> Copyright &#169; {dateYear} Gaming- All rights reserved </span>
        </div>
      </Container>
    </div>
  )
}
