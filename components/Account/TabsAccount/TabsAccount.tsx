"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/Hooks";
import { Tab } from "semantic-ui-react";
import { Settings } from "./Settings";
import { Address } from "./Address";
import Separator from "@/components/Utils/Separator/Separator";
import styles from "./TabsAccount.module.scss";
import { WishList } from "./WishList";

export function TabsAccount() {
  const { logout, user, loading } = useAuth();
  const [reload, setReload] = useState(false)
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    if (!loading && !Object.keys(user).length) {
      router.push("/join/sign-in");
    }
  }, [loading, user]);

  const onReload = () => setReload((prevState) => !prevState)

  const panes = [
    {
      menuItem: { key: "mis-pedidos", content: "Mis pedidos" },
      render: () => (
        <Tab.Pane attached={false} key="mis-pedidos">
          
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "mis-deseos", content: "Lista de deseos" },
      render: () => (
        <Tab.Pane attached={false} key="mis-deseos">
          <WishList />
          <Separator height={80}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "mis-direcciones", content: "Direcciones" },
      render: () => (
        <Tab.Pane attached={false} key="mis-direcciones">
          <Address.AddAddress idUser={user.id} onReload={onReload}/>
          <Address.ListAddresses reload={reload} onReload={onReload}/>
          <Separator height={80}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "ajustes", icon: "settings", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false} key="ajustes">
          <Settings.ChangeNameForm userData={user}/>
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm idUser={user.id}/>
            <Settings.ChangePasswordForm idUser={user.id}/>
          </div>
          <Separator height={80}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "logout",
        icon: "log out",
        content: "",
        onClick: () => onLogout(),
      },
      render: () => (
        <Tab.Pane attached={false} key="logout">
          {/* Aquí puedes agregar contenido si es necesario */}
        </Tab.Pane>
      ),
    },
  ];

  if (loading) return <p>Cargando ...</p>

  return (
    <>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        className={styles.tabs}
      />
    </>
  );
}
