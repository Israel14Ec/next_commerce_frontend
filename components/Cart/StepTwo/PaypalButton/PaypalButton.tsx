import { useRouter } from "next/navigation";
import { AddresT, GamesQuantity, PayPalOrder } from "@/src/types";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Cart } from "@/src/api"
import { useAuth, useCart } from "@/src/Hooks"
import { toast } from "react-toastify";

type PaypalButtonProps = {
  price: number;
  invoice: string;
  games: GamesQuantity[]
  addressSelected: AddresT
};

const cartCtrl = new Cart()

export function PaypalButton({price, invoice, games, addressSelected} : PaypalButtonProps) {
  const router = useRouter()
  const { user } = useAuth()
  const {  deleteAllItems } = useCart()

  //Registro de paypal a la DB
  const paymantRegister = async (order : PayPalOrder | undefined) => {
    try {
      if(order?.id === undefined) {
        return new Error("No se pudo realizar el pago")
      }
      await cartCtrl.paymenCart(order.id, games, user.id, addressSelected, price)
      toast.success("Se registro la compra")
      deleteAllItems() //Eliminar cart de storage
      router.push('/home')


    } catch (error) {
      console.error(error);
      toast.error("Algo salió mal, no se pudo realizar el pago")
    }
  }

  return (
    <PayPalButtons
      //Creación del pago
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: invoice, // Descripción del producto o servicio
              amount: {
                currency_code: "USD", // Moneda (asegúrate de usar un código válido)
                value: price.toString(), // Precio (string con formato decimal, e.g., "50.00")
              },
            },
          ],
        });
      }}
      //Aprobación del pago - Captura la orden
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture(); //Captura la orden
        paymantRegister(order)
      }}
      onError={(err) => {
        console.error("Error durante el proceso de pago: ", err);
      }}
    />
  );
}
