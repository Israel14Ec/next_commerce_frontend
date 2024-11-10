import axios from "axios"
import api from "../lib/axios"
import { PlatformType } from "../types"

export class Platform {

    async getAll() {
        try {
            const sort = "sort=order:asc"
            const url = `/platforms?populate=icon&${sort}`
            const { data: {data} } = await api.get<{data: PlatformType[]}>(url)
            return data

        } catch (error) {
            throw error
        }
    }

    async getBySlug(slug:PlatformType['attributes']['slug']) {
        try {
            const filters = `filters[slug][$eq]=${slug}`
            const url = `/platforms?${filters}`
            const { data: {data} } = await api.get<{data: PlatformType[]}>(url)
             return data[0]

        } catch (error) {
            throw error
        }
    }


}