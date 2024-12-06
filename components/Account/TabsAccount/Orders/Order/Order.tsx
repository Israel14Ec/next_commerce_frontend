import { useState } from "react"
import { BasicModal } from "@/components/Utils/BasicModal"
import { DateTime } from "luxon"
import { fn } from "@/src/utils/functions"
import { OrderT } from "@/src/types"
import { useMemo } from "react"
import styles from "./Order.module.scss"
import { serverHost } from "@/src/utils/serverHost"

type OrderProps = {
    order: OrderT
}

export function Order({order} : OrderProps) {

    const createdAt = new Date(order.attributes.createdAt).toISOString()
    const getTotalProducts = useMemo(() => order.attributes.products.reduce((acc, product) => acc + product.quantity, 0), [order])
    const [showModal, setShowModal] = useState(false)
    
    const openCloseModal = () => setShowModal(prevState => !prevState)
    
    const products = order.attributes.products
    const address = order.attributes.addressShoping

  return (
    <>
        <div className={styles.order} onClick={() => openCloseModal()} >
            <div>
                <span> {DateTime.fromISO(createdAt, { locale: "es"}).toFormat("dd/MM/yyyy")} </span>
                <p> {getTotalProducts} productos</p>
            </div>

            <p> { fn.formatPrice(order.attributes.totalPayment)} </p>
        </div>

        <BasicModal show={showModal} onClose={openCloseModal} title="Información del pedido">
            {products.map( (product) => (
                <div key={product.id} className={styles.product}>
                    <img src={`${serverHost}${product.attributes.portada.data.attributes.url}`} />
                    <div>
                        <div className={styles.info} >
                            <div>
                                <p> { product.attributes.title} </p>
                                <p> { product.attributes.platform.data.attributes.title} </p>

                            </div>
                        </div>

                        <div className={styles.quantity} >
                            <span>x{ product.quantity} </span>
                            <span> { fn.formatPrice(fn.calcDiscountePrice(product.attributes.price, product.attributes.discount))} </span>
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.address} >
                <div>
                    <p className={styles.title} >
                        { address.attributes.title}
                    </p>
                    <p className={styles.addressInfo} >
                        { address.attributes.name}, {" "}
                        { address.attributes.address}, {" "}
                        { address.attributes.state}, {" "}
                        { address.attributes.city}, {" "}
                        { address.attributes.postal_code}
                    </p>
                </div>
            </div>

            <div className={styles.total} >
                <p>TOTAL: { fn.formatPrice(order.attributes.totalPayment)} </p>
                
            </div>
        </BasicModal>
    </>
  )
}
