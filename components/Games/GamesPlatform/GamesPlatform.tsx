"use client"

import { Container } from "semantic-ui-react"
import { ReactNode } from "react"

type GamesPlatformProps = {
    children: ReactNode
}

export function GamesPlatform({children} : GamesPlatformProps) {
  return (
    <Container>
        {children}
    </Container>
  )
}
