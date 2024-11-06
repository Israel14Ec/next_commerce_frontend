"use client"

import { ReactNode } from "react"
import { Modal } from "semantic-ui-react"

type BasicModalProps = {
    title: string
    children: ReactNode
    show: boolean
    onClose: () => void
}

export function BasicModal({title, children, show, onClose} : BasicModalProps) {
  return (
    <Modal open={show} onClose={onClose} size="small">
        <Modal.Header>{title} </Modal.Header>
        <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}
