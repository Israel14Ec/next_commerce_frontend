import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "semantic-ui-react";
import { GamesQuantity } from "@/src/types";
import { fn } from "@/src/utils/functions";
import styles from "./Resume.module.scss";

type ResumeProps = {
  games: GamesQuantity[];
};

type TotalsT = {
  original: number;
  discount: number;
  price: number;
};

export function Resume({ games }: ResumeProps) {
  const router = useRouter();
  const [totals, setTotals] = useState<TotalsT>();

  useEffect(() => {
    let totals: TotalsT = {
      original: 0,
      discount: 0,
      price: 0,
    };

    games.forEach((game) => {
      const price = fn.calcDiscountePrice(
        game.attributes.price,
        game.attributes.discount
      );

      totals = {
        original: totals.original + game.attributes.price * game.quantity,
        discount:
          totals.discount + (game.attributes.price - price) * game.quantity,
        price: totals.price + price * game.quantity,
      };

      setTotals(totals);
    });
  }, [games]);

  const goToStepTwo = () => {
    router.replace(`/cart?step=2`);
  };

  if (totals === undefined) return null;

  return (
    <div className={styles.resume} >
        <h2>Resumen</h2>

        <div className={styles.block}>
            <div className={styles.price} >
                <div>
                    <span>Precio Oficial</span>
                    <span> { fn.formatPrice(totals.original)} </span>
                </div>
                <div>
                    <span>Descuento</span>
                    <span> { fn.formatPrice(totals.discount)} </span>
                </div>
                <div>
                    <span>Subtotal:</span>
                    <span> { fn.formatPrice(totals.price)} </span>
                </div>
            </div>
            <Button primary fluid onClick={goToStepTwo}>
                Proceder con el pago
            </Button>

            <Link href="/home">Continuar comprando</Link>
        </div>
    </div>
  );
}
