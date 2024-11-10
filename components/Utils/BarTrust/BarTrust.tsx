"use client"

import { Container, Icon } from "semantic-ui-react"
import { data } from "./BarTrust.data"
import styles from "./BarTrust.module.scss"

export function BarTrust() {
  return (
    <div className={styles.barTrust} >
        <Container className={styles.content} >
            {data.map(item => (
                <div key={item.title} className={styles.block} >
                    <Icon 
                        name={item.icon}
                    />
                    <div>
                        <h5> {item.title} </h5>
                        <span> {item.description} </span>
                    </div>
                </div>
            ))}
        </Container>
    </div>
  )
}
