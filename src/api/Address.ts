import api, { CustomAxiosRequestConfig } from "../lib/axios";
import { AddressDraft, AddresT, UserLogged } from "../types";

export class Address {

    async create(dataAddress:AddressDraft) {
        try {
            const url = "/addresses"
            const { data } = await api.post(url,{data: dataAddress},{ requiresAuth: true} as CustomAxiosRequestConfig)
            return data

        } catch (error) {
            throw error
        }
    }

    async getAll(userId : UserLogged['id']) {
        try {
            const url = `/addresses?filters[user][id][$eq]=${userId}`
            const { data : {data} } = await api.get<{data: AddresT[]}>(url, { requiresAuth:true } as CustomAxiosRequestConfig)            
            return data

        } catch (error) {
            throw error
        }
    }

    async update(dataAddress:AddresT['attributes'], addressId:AddresT['id']) {
        try {
            const url = `/addresses/${addressId}`
            const { data } = await api.put(url, {data: dataAddress}, { requiresAuth: true} as CustomAxiosRequestConfig)
            return data

        } catch (error) {
            throw error
        }
    }

    async delete (idAddress:AddresT['id']) {
        try {
            const url = `/addresses/${idAddress}`
            const { data } = await api.delete(url, { requiresAuth: true} as CustomAxiosRequestConfig)
            return data
            
        } catch (error) {
            throw error
        }
    }
}