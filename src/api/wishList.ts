import api, { CustomAxiosRequestConfig } from "../lib/axios";
import { GamesT, UserLogged, WishListT, WishListWithGame } from "../types";

export class WishList {

    async check (userId : UserLogged['id'], gameId: GamesT['id']) {
        try {            
            const filterUser = `filters[user][id][$eq][0]=${userId}`
            const filterGame = `filters[game][id][$eq][1]=${gameId}`

            const url = `/wishlists?${filterUser}&${filterGame}`
            const { data: {data} } = await api.get<{data: WishListT[]}>(url, {requiresAuth: true} as CustomAxiosRequestConfig)

            return data

        } catch (error) {
            throw error
        }
    }

    async add(userId: UserLogged['id'], gameId:GamesT['id']) {
        try {

            const dataWishList = {
                user: userId,
                game: gameId
            }
            const url = `/wishlists`
            const { data: {data}} = await api.post<{data: WishListT}>(url, {data: dataWishList}, { requiresAuth: true} as CustomAxiosRequestConfig)
            return data

        } catch (error) {
            throw error
        }
    }

    async delete (id: WishListT['id']) {
        try {
            const url = `/wishlists/${id}`
            const { data } = await api.delete(url, {requiresAuth: true} as CustomAxiosRequestConfig)
            return data

        } catch (error) {
            throw error
        }
    }

    async getAll(userId: UserLogged['id']) {
        try {

            const filters = `filters[user][id][$eq]=${userId}`
            const populate = "populate[0]=game&populate[1]=game.portada"

            const url = `/wishlists?${filters}&${populate}`
            const { data: {data}} = await api.get<{data: WishListWithGame[]}>(url, {requiresAuth: true} as CustomAxiosRequestConfig)
            return data

        } catch (error) {
            throw error
        }
    }
}