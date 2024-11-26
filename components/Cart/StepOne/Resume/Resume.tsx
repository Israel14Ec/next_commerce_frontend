import { GamesQuantity } from "@/src/types"
import styles from "./Resume.module.scss"

type ResumeProps = {
    games : GamesQuantity[] 
}

export function Resume({games} : ResumeProps) {
  return (
    <div>Resume</div>
  )
}
