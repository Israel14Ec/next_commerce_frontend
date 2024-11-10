"use client";
import { useEffect, useState } from "react";
import { Icon, Input } from "semantic-ui-react";
import { Platform } from "@/src/api";
import styles from "./Menu.module.scss" 
import Link from "next/link";
import { PlatformType } from "@/src/types";
import { serverHost } from "@/src/utils/serverHost";
const platformController = new Platform();

export function Menu() {

  const [platforms, setPlatforms] = useState<PlatformType[]>([])
  const [loadingPlataform, setLoadingPlataform] = useState(true)
  const [showSearch, setShowSearch] = useState(false)

  const openCloseSearch = () => setShowSearch(prevState => !prevState)

  useEffect(() => {
    (async () => {
      try {
        setLoadingPlataform(true)
        const platformData = await platformController.getAll();
        setPlatforms(platformData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPlataform(false)
      }
    })();
  }, []);

  if(loadingPlataform) return <p>Cargando...</p>
  
  return (
    <div className={styles.platform}>
      {
        platforms.length > 0 ? (
          <>
            {platforms.map((platform) => (
              <Link key={platform.id} href={`/home/games/${platform.attributes.slug}?page=1`}>
                  <img 
                    src={`${serverHost}${platform.attributes.icon.data.attributes.url}`} 
                    alt={platform.attributes.title} 
                  />
                  {platform.attributes.title} 
              </Link>
            ))}
            <button className={styles.search} onClick={openCloseSearch}>
               <Icon name="search"/>
            </button>
          </>
        ):
        (
          <p>No hay plataformas por el momento</p>
        )
      }
      <div className={`${styles.inputContainer} ${showSearch ? styles.active : ''}`} >
        <Input id="search-games" placeholder="Buscador" className={styles.input} focus={true}/>
        <Icon name="close" className={styles.closeInput} onClick={openCloseSearch} />
      </div>
    </div>
  )
}
