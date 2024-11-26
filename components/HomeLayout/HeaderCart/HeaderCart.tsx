"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "semantic-ui-react";
import styles from "./HeaderCart.module.scss";

export function HeaderCart() {

  const searchParams = useSearchParams()

  const stepCurrent = searchParams.get('step') || 1


  const steps = [
    { number: 1, title: "Cesta" },
    { number: 2, title: "Pago" },
    { number: 3, title: "Confirmación" },
  ];

  return (
    <div className={styles.headerCart}>
      <div className={styles.left}>
        <Link href={"/"}>
          <img src="/image/logo.png" alt="gaming" />
        </Link>
      </div>
      <div className={styles.center}>
        {steps.map((step) => (
          <div key={step.number} className={`
            ${step.number === +stepCurrent ? styles.active : ''} 
            ${step.number < +stepCurrent ? styles.success : ''}`}
          >
            <span className={styles.number}>
              <Icon name="check" />
              {step.number}
            </span>
            <span> {step.title} </span>
            <span className={styles.space}></span>
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <Icon name="lock" />
        <div>
          <span>Pago seguro</span>
          <span>256 bit SSL Secure</span>
        </div>
      </div>
    </div>
  );
}
