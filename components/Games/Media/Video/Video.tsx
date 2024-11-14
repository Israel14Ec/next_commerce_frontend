"use client"

import dynamic from "next/dynamic" //Carga componentes de manera dinámica.
import styles from "./Video.module.scss"

// {ssr: false} omita la renderización en el servidor y lo carga en el cliente, se usa por que ReactPlayer depende la API del navegador
const ReactPlayer = dynamic(() => import("react-player"), {ssr: false}) 
import { GamesByPlatformPopulate } from "@/src/types"

type VideoProps = {
    video: GamesByPlatformPopulate['attributes']['video']
}

export function Video({ video }: VideoProps) {
  return (
    <ReactPlayer 
        className={styles.video} 
        url={video} 
        controls width="100%" 
        height={634} 
    />
  )
}
