import { GamesQuantity } from "@/src/types";
import styles from "./StepOne.module.scss";
import { Basket } from "./Basket";
import { Resume } from "./Resume"

type StepOneProps = {
  games: GamesQuantity[] | undefined;
};

export function StepOne({ games }: StepOneProps) {
  return (
    <div className={styles.stepOne} >
      <div className={styles.center}>
        { games?.length ? (
            <Basket games={games}/>
        ):
            <p>No hay juegos por el momento</p>
        }
      </div>
      <div className={styles.right}>
        { games?.length && (
          <Resume games={games}/>
        )}
      </div>
    </div>
  );
}
