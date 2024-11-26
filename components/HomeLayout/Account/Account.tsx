"use client";

import { Button, Icon, Label } from "semantic-ui-react";
import { useRouter } from "next/navigation";
import { useAuth, useCart } from "@/src/Hooks";
import styles from "./Account.module.scss";
import { toast } from "react-toastify";

export function Account() {

  const { total } = useCart()
  const { user } = useAuth();

  const router = useRouter();
  const userDataExist = Object.keys(user).length > 0

  const goToLogin = () => router.push("/join/sign-in");
  const goToAccount = () => router.push("/home/account");

  const goToCart = () => {
    if (!Object.keys(user).length) {
      toast.warning("Inicia sesión primero para ver el carrito");
      goToLogin();
      return;
    }
    return router.push("/cart");
  };

  return (
    <div className={styles.account}>
      <Button icon className={styles.cart}>
        <Icon name="cart" onClick={goToCart} />
        {total > 0 && <Label circular> {total} </Label>}
      </Button>

      <Button icon onClick={userDataExist ? goToAccount : goToLogin} className={userDataExist ? styles.user : ""}>
        <Icon name="user outline" />
        {
          userDataExist && (
            <Label>{user.username} </Label>
          )
        }
      </Button>
    </div>
  );
}
