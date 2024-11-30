import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Address } from "@/src/api"
import { useAuth } from "@/src/Hooks"
import styles from "./Addresses.module.scss"
import { AddresT } from "@/src/types"

type AddressesProps = {
  addressSelected: AddresT | undefined
  setAddressSelected: Dispatch<SetStateAction<AddresT | undefined>>
}

const addressCtrl = new Address()

export function Addresses({ addressSelected, setAddressSelected} : AddressesProps) {

  const [addresses, setAddresses] = useState<AddresT[]>()
  const { user, loading} = useAuth()

  useEffect(() => {
    (async () => {
      try {
        if(!loading) {
          const response = await addressCtrl.getAll(user.id)
          setAddresses(response)
        }
      } catch (error) {
        console.error(error);
      }
    })() 
  }, [loading])
  

  return (
    <div className={styles.addresess} >
      <h2>Seleccione la dirección</h2>

      {addresses?.length && (
        addresses.map((address) => (
          <div key={address.id} className={`${styles.address} ${address.id === addressSelected?.id ? styles.active : ""}`} 
            onClick={() => setAddressSelected(address)}
          >
            <p> {address.attributes.name} ({address.attributes.title})</p>
            <p> {address.attributes.address}, { address.attributes.postal_code} {" "}, {address.attributes.state}, 
                {address.attributes.city}  
            </p>
          </div>
        ))
      )}
    </div>
  )
}
