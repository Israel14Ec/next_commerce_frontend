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
}