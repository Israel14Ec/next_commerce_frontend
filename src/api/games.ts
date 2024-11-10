import api from "../lib/axios"
import { GamesPagination, GamesT, PlatformType } from "../types"

export class Games {

    async getLastPublished() {
        try {
            const sort = "sort=publishedAt:desc"
            const pagination="pagination[limit]=1"
            const populate="populate=*"
            const url = `/games?${sort}&${pagination}&${populate}`
            const { data: {data} } = await api.get<{data: GamesT[]}>(url)
            return data[0]
            
        } catch (error) {
            throw error
        }
    }

    async getLatestPublished ( limit : number = 9, platformId : PlatformType['id']|null = null) {
        try {
            const filtersPlatorms = platformId ? `filters[platform][id][$eq]=${platformId}` : ""
            const paginationLimit = `pagination[limit]=${limit}`
            const sort = `sort=publishedAt:desc`
            const populate = `populate=*`
            const url = `/games?${filtersPlatorms}&${paginationLimit}&${sort}&${populate}`
            const { data: {data} } = await api.get<{data: GamesT[]}>(url)
            return data

        } catch (error) {
            throw error
        }
    }

    async getGamesByPlatform (slug:PlatformType['attributes']['slug'], page: number = 1) {
        try {
            const filters = `filters[platform][slug][$eq]=${slug}`
            const pagination = `pagination[page]=${page}&pagination[pageSize]=3`
            const populate = "populate=*"
            
            const url = `/games?${filters}&${pagination}&${populate}`
            const {data} = await api.get<GamesPagination>(url)
            return data
    
        } catch (error) {
            throw error
        }
    }
}