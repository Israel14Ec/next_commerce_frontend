import api, { CustomAxiosRequestConfig } from "../lib/axios";
import { OrderT, UserLogged } from "../types";

export class Order {

    async getAll(userId: UserLogged["id"]) {
        try {
            const filters = `filters[user][id][$eq]=${userId}`
            const sort = "sort[0]=createdAt:desc"
            const url = `/orders?${filters}&${sort}`
            const { data : {data} } = await api.get<{data: OrderT[]}>(url, { requiresAuth: true} as CustomAxiosRequestConfig )
            return data
            
        } catch (error) {
            throw error
        }
    } 
}