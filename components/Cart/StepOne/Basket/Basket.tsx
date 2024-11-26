import { Icon, Dropdown } from "semantic-ui-react";
import { GamesQuantity } from "@/src/types";
import { fn } from "@/src/utils/functions";
import { useCart } from "@/src/Hooks";
import { serverHost } from "@/src/utils/serverHost";
import styles from "./Basket.module.scss";

type BasketProps = {
  games: GamesQuantity[];
};

export function Basket({ games }: BasketProps) {
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: `${number}`, value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {games.map((game) => (
          <div key={game.id} className={styles.product}>
            <img
              src={`${serverHost}${game.attributes.portada.data.attributes.url}`}
              alt="Cover del juego"
            />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{game.attributes.title}</p>
                  <p> {game.attributes.platform.data.attributes.title} </p>
                </div>
                <Icon name="trash alternate outline" link onClick={ () => deleteItem(game.id)}/>
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className={styles.number}
                  options={options}
                  selection
                  value={game.quantity} // Convierte a número, usa 0 si no es un número válido
                  compact
                  onChange={(_, data) =>changeQuantityItem(game.id, Number(data.value))}
                />

                <span>
                  {fn.formatPrice(
                    fn.calcDiscountePrice(
                      game.attributes.price,
                      game.attributes.discount
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
