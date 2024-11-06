import { useState, useEffect } from "react"
import { Address } from "@/src/api"
import { useAuth } from "@/src/Hooks"
import { AddresT } from "@/src/types"
import { Spinner } from "@/components/Utils/Spinner"
import { AddressL } from "./AddressL"
import styles from "./ListAddresses.module.scss"

type ListAddressesProps = {
  reload: boolean
  onReload: () => void
}

const addressController = new Address()

export function ListAddresses({reload, onReload} : ListAddressesProps) {

  const { user } = useAuth()
  const [address, setAddress] = useState<AddresT[]>({} as AddresT[])
  const [loading, setLoading] = useState(true)
  const addressDataExist = Object.keys(address).length > 1

  useEffect( () => {
    //Función anónima autoejecutable
    ( async () => {
      try {
        setLoading(true)
        const response = await addressController.getAll(user.id)
        setAddress(response)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    })()
  }, [reload])
  
  if(loading) return (<Spinner/>)
  
  if(!addressDataExist) return (
    <p>No se agregaron direcciones tadavía</p>
  )

  return (
    <div className={styles.addresses} >
      {address.map(address => (
        <AddressL 
          key={address.id}
          idAddress={address.id}
          address={address.attributes}
          onReload={onReload}
          userId={user.id}
        />
      ))}
    </div>
  )
}
