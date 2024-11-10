"use client"

import { useState, useEffect } from "react"
import { Container } from "semantic-ui-react"
import { Games } from "@/src/api"
import { GamesT } from "@/src/types"
import { Spinner } from "@/components/Utils/Spinner"
import { GridGames } from "@/components/Utils/GridGames"

type LatestGamesProps = {
  title: string
  limit?: number
  platformId?: number
}

const gameController = new Games()

export function LatestGames({ title, limit=9, platformId} : LatestGamesProps) {

  const [games, setGames] = useState<GamesT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async() => {
      try {
        const response = await gameController.getLatestPublished(limit, platformId)
        setGames(response)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  
  if(loading) return (
    <Spinner/>
  )

  if(!games.length) {
    return null
  }

  return (
    <div>
      <Container>
        <h2>{title}</h2>
        <GridGames 
          games={games}
        />
      </Container>
    </div>
  )
}
