import { ReactNode } from "react";
import { TopBar, Footer } from "@/components/HomeLayout";
import styles from "./home-layout.module.scss";

export default function layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <TopBar />
      <div className={styles.top}>{children}</div>
      <Footer />
    </>
  );
}
