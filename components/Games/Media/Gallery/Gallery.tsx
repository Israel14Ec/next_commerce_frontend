import { useState } from "react"
import { Screenshots } from "@/src/types"
import { serverHost } from "@/src/utils/serverHost"
import { FullModal } from "@/components/Utils/FullModal"
import Slider from "react-slick";
import styles from "./Gallery.module.scss"

type GalleryProps = {
    screenshots: Screenshots["screenshots"]["data"]
}

export function Gallery({screenshots} : GalleryProps) {
  
    const screenshotClone = [...screenshots]
    const principalImage = screenshotClone.shift()    
    const [show, setShow] = useState(false)

    const onOpenClose = () => setShow(prevState => !prevState)

    const settings = {
        dots: true,
        dotsClass: styles.dots,
        infinite: true,
        slidersToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: function (index:number) {
          return <img src={`${serverHost}${screenshots[index].attributes.url}`} />;
        },
      };

    return (
    <>
        <div className={styles.gallery}>
            <div className={styles.principal} >
                <img 
                    src={`${serverHost}${principalImage?.attributes.url}`}
                    onClick={onOpenClose}
                />
            </div>

            <div className={styles.grid} >
                {screenshots.map((screenshot, index)=> (
                    <div key={index}>
                        <img src={`${serverHost}${screenshot.attributes.url}`} 
                            onClick={onOpenClose}
                        />
                    </div>
                ))}
            </div>
        </div>
        
        <FullModal show={show} onClose={onOpenClose}>
            <div className={styles.carouselContainer} >
                <Slider {...settings}>
                    {screenshots.map((screenshot, index) => (
                        <div key={index}>
                            <img 
                                src={`${serverHost}${screenshot.attributes.url}`}
                                
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </FullModal>
    </>
  )
}
