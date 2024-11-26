import { ReactNode } from "react"
import Separator from "@/components/Utils/Separator/Separator"
import { Footer, HeaderCart } from "@/components/HomeLayout"

export default function layout({children } : Readonly<{children: ReactNode}>) {
  return (
    <>
        <HeaderCart/>
        <Separator height={150}/>
        {children}
        <Separator height={70}/>
        <Footer/>
      
    </>
  )
}
