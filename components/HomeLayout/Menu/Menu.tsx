"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, Input } from "semantic-ui-react";
import { Platform } from "@/src/api";
import { PlatformType } from "@/src/types";
import { serverHost } from "@/src/utils/serverHost";
import { useAuth } from "@/src/Hooks";
import Link from "next/link";
import styles from "./Menu.module.scss" 
import { Spinner } from "@/components/Utils/Spinner";

const platformController = new Platform();

export function Menu() {

  const [platforms, setPlatforms] = useState<PlatformType[]>([])
  const [loadingPlataform, setLoadingPlataform] = useState(true)
  const router = useRouter()

  const { showSearch, setShowSearch}= useAuth()

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

  const onSearch =( text: string) => {
    router.replace(`/home/search?s=${text}`)
  }

  if(loadingPlataform) return <Spinner />
  
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
        <Input 
          id="search-games" 
          placeholder="Buscador" 
          className={styles.input} 
          focus={true}
          onChange={(_, data) => onSearch(data.value)}  
        />
        <Icon name="close" className={styles.closeInput} onClick={openCloseSearch} />
      </div>
    </div>
  )
}
