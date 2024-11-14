import { serverHost } from "@/src/utils/serverHost"
import styles from "./HeaderWallpaper.module.scss"

type HeaderWallpaperProps = {
    image: string
}

export function HeaderWallpaper({image} : HeaderWallpaperProps) {
  return (
    <div className={styles.headerWallpaper} >
        <img 
            src={`${serverHost}${image}`}
            alt="Imagen del juego"
        />
    </div>
  )
}
