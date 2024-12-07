import { ReactNode } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import style from './join-layout.module.scss'
import Image from 'next/image'

export default function layout({children}:Readonly<{children: ReactNode}>) {

  return (
    <div className={style.container}>
        <div className={style.topBar}>
            <Link href='/'>
                <Image 
                    fill
                    src={'/image/logo.png'}
                    alt='gaming'
                    priority
                />
            </Link>
            <Link href='/' className={style.icon} >
                <XCircleIcon className={style.icon}/>
            </Link>
        </div>
        <div className={style.blockLeft}>
            { children }
        </div>

        <div className={style.blockRight} />
    </div>
  )
}
