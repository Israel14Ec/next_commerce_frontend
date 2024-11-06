import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"
import { AddressForm } from "../../AddressForm"
import { AddresT, UserLogged } from "@/src/types"
import { Confirm } from "@/components/Utils/Confirm"
import { BasicModal } from "@/components/Utils/BasicModal"
import styles from "./AddresL.module.scss"
import { Address } from "@/src/api"
import { toast } from "react-toastify"

type AddressLProps = {
  idAddress: AddresT['id']
  address: AddresT['attributes']
  onReload: () => void
  userId: UserLogged['id']
}

const addressController = new Address()

export function AddressL({idAddress, address, onReload, userId} : AddressLProps) {
  
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const openCloseEdit = () => setShowEdit(!showEdit)
  const openCloseConfirm = ()  => setShowConfirm(!showConfirm)

  const onDelete = async () => {
    try {
      await addressController.delete(idAddress)
      onReload()
      toast.success("Se borro la dirección")
    } catch (error) {
      console.error(error);
      toast.error("No se puede actualizar la información")
    }
  }

  return (
    <>
      <div className={styles.address}>
        <div>
          <p className={styles.title}>{address.title}:</p>
          <p className={styles.addressInfo}>
            {address.name}, {address.address}, {address.state}, {address.city}, {address.postal_code}
          </p>
        </div>

        <div className={styles.actions}>
          <Button primary icon onClick={() => openCloseEdit()}>
            <Icon name="pencil"/>
          </Button>
          <Button primary icon onClick={() => openCloseConfirm()}>
            <Icon name="delete"/>
          </Button>
        </div>
      </div>

      <Confirm 
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={() => onDelete()}
        content="Estas seguro que quieres eliminar la dirección?"
      />

      <BasicModal 
        show={showEdit}
        onClose={openCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          onClose={openCloseEdit}
          onReload={onReload}
          userId={userId}
          idAddress={idAddress}
          address={address}
        />
      </BasicModal>
    </>
  )
}
