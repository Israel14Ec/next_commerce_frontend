"use client";

import { createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react";
import { UserLogged } from "../types";
import { User } from "../api";
import { Token } from "../utils/token";

const tokenController = new Token();
const userController = new User();

//Props que va a manejar el Context
type AuthContextProps = {
  accessToken: string;
  user: UserLogged;
  loading: boolean;
  showSearch: boolean
  setShowSearch: Dispatch<SetStateAction<boolean>>
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (key: string, value: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

//Creación del contexto
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLogged>({} as UserLogged);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    //Función anonima autoejecutable
    (async () => {
      try {
        setLoading(true)
        const token = tokenController.getToken();

        if (!token) {
          logout();
          return;
        }

        const isExpired = tokenController.hasExpired(token);
        if (isExpired) {
          logout();
          return;
        }

        await login(token);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    })();
  }, []);

  const logout = () => {
    tokenController.removeToken();
    setAccessToken("");
    setUser({} as UserLogged);
  };

  const login = async (token: string) => {
    try {
      tokenController.setToken(token);
      const userData = await userController.getMe();
      setUser(userData);
      setAccessToken(token);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //Actualiza localmente los datos del usuario
  const updateUser = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, logout, loading, updateUser, showSearch, setShowSearch }}
    >
      {children}
    </AuthContext.Provider>
  );
}
