import { isAxiosError } from "axios"
import { UserLogged } from "../types"
import api, { CustomAxiosRequestConfig } from "../lib/axios"

export class User {
    
    async getMe() {
        try {
            const url = `/users/me`;
            const { data } = await api.get<UserLogged>(url, { requiresAuth: true } as CustomAxiosRequestConfig);
            return data;
        } catch (error) {
            const token = localStorage.getItem("AUTH_TOKEN");
            if (token) {
                localStorage.removeItem("AUTH_TOKEN"); // Remueve el token si existe en localStorage
            }
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error.message);
            }
            throw new Error("Ocurrió un error inesperado");
        }
    }

    async updateMe(userId: UserLogged["id"], dataUpdate: unknown) {
        if (typeof dataUpdate !== "object" || dataUpdate === null) {
          throw new Error("dataUpdate must be a non-null object");
        }
      
        try {
          const url = `/users/${userId}`;
          const { data } = await api.put(url, dataUpdate, { requiresAuth: true } as CustomAxiosRequestConfig);
          return data;
        } catch (error) {
          throw error;
        }
      }
      
}