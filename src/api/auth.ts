import { isAxiosError } from "axios";
import { Login, UserRegister } from "../types";
import { Token } from "@/src/utils/token"
import api from "../lib/axios";

const tokenController = new Token()

export class Auth {
    async register(dataUser: UserRegister) {
        try {
            const url = "/auth/local/register";
            const { data } = await api.post(url, dataUser);
            return data;
        } catch (error) {
            console.log("Hubo error: ", error);
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error.message);
            }
            // Lanza un error genérico si no es de Axios
            throw new Error("Ocurrió un error inesperado");
        }
    }

    async login(dataForm: Login) {
        try {
            const url = "/auth/local";
            const { data } = await api.post(url, dataForm);
            return data;

        } catch (error) {
            console.error(error);
            const token = tokenController.getToken()
            if(token) {
                localStorage.removeItem("AUTH_TOKEN")//Remueve el item
            }
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error.message);
            }
            // Lanza un error genérico si no es de Axios
            throw new Error("Ocurrió un error inesperado");
        }
    }
}
