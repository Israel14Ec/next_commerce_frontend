"use client"

import { useState, useEffect } from "react"
import { Games } from "@/src/api"
import { GamesT } from "@/src/types"
import { Spinner } from "@/components/Utils/Spinner"

const gameController = new Games()
const LIMIT = 9

export function LatestGames() {

  const [games, setGames] = useState<GamesT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async() => {
      try {
        const response = await gameController.getLatestPublished(LIMIT)
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

    </div>
  )
}
