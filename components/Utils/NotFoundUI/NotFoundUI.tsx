import styles from "./NotFoundUI.module.scss"

type NotFoundUIProps = {
  text: String
}

export function NotFoundUI({text} : NotFoundUIProps) {
  return (
    <div className={styles.notResult} >
        <p>{text}</p>
    </div>
  )
}
