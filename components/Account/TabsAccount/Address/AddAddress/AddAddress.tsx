import { useState } from "react"
import { Button } from "semantic-ui-react"
import { AddressForm } from "../AddressForm"
import {BasicModal} from "@/components/Utils/BasicModal"
import styles from "./AddAddress.module.scss"
import { AddressDraft } from "@/src/types"

type AddAddressProps = {
  idUser: AddressDraft['user']
  onReload: () => void
}

export function AddAddress({idUser, onReload}:AddAddressProps) {

  const [show, setShow] = useState(false)
  const openCloseShow = () => setShow(prevState => !prevState)
  return (
    <>
      <Button primary className={styles.addBtn} onClick={() => openCloseShow()}>
        Añadir
      </Button>

      <BasicModal title="Nueva dirección" onClose={openCloseShow} show={show}>
        <AddressForm onClose={openCloseShow} userId={idUser} onReload={onReload}/>
      </BasicModal>
    </>
  )
}
