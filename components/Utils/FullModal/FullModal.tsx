"use client"

import { ReactNode } from "react"
import { Icon, Modal } from "semantic-ui-react"
import styles from "./FullModal.module.scss"

type FullModalProps = {
    children: ReactNode
    show: boolean
    onClose: () => void
}

export function FullModal({children, show, onClose} : FullModalProps) {
  return (
    <Modal open={show} className={styles.fullModal} >
        <Modal.Content >
            {children}
        </Modal.Content>

        <Icon name="close" className={styles.close} onClick={onClose}/>
    </Modal>
  )
}
