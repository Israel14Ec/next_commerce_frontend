"use client";

import { Button, Icon } from "semantic-ui-react";
import { useAuth } from "@/src/Hooks";
import { DateTime } from "luxon";
import styles from "./Info.module.scss";

export function Info() {
  const { user } = useAuth();
  const createdAtFormatted = user?.createdAt? DateTime.fromISO(new Date(user.createdAt).toISOString(), { locale: "es" }).toFormat("DDD")
    : "Fecha no disponible";

  return (
    <div className={styles.info}>
      <Button icon className={styles.user}>
        <Icon name="user outline" />
      </Button>
      <h3 className={styles.username}>{user.username}</h3>
      <h4 className={styles.email}>{user.email}</h4>
      <p className={styles.createdAt}>Miembro desde: {createdAtFormatted}</p>
    </div>
  );
}
