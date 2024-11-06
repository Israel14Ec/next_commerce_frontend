import { ReactNode } from "react";
import styles from "./Discount.module.scss";

type DiscountProps = {
    children: ReactNode
    className: string
}

export function Discount({children, className} : DiscountProps) {
  
  return (
    <span
      className={ className ? '':''}
    >
      {children}
    </span>
  );
}