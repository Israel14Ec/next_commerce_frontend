"use client"

import {Container } from "semantic-ui-react"
import { GamesByPlatformPopulate } from "@/src/types"
import { Video } from "./Video"
import Separator from "@/components/Utils/Separator/Separator"
import { Gallery } from "./Gallery"


type MediaProps = {
  video: GamesByPlatformPopulate['attributes']['video']
  screenshots: GamesByPlatformPopulate['attributes']['screenshots']['data']
}

export default function Media({ video, screenshots} : MediaProps) {
  
  return (
    <Container>
      <h2>Visuales</h2>
      <Separator height={30}/>
      <Video video={video}/>
      <Separator height={30}/>

      {screenshots.length > 0 && (
        <Gallery 
          screenshots={screenshots}
        />
      )}
    </Container>
  )
}
