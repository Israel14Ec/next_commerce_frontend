import Link from "next/link"
import styles from "./TopBar.module.scss"
import {Account} from "../Account"
import { Menu } from "../Menu"

export function TopBar({}) {
  return (
    <div className={styles.topBar}>
        <div className={styles.left}>
            <Link href="/home">
                <img src="/image/logo.png" alt="Logo de la tienda"/>
            </Link>
        </div>

        <div className={styles.center}>
            <Menu/>
        </div>

        <div className={styles.right}>
            <Account/>
        </div>
    </div>
  )
}
