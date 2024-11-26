import api, { CustomAxiosRequestConfig } from "../lib/axios"
import { GamesByPlatformPopulate, GamesPagination, GamesT, PlatformType } from "../types"

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

    async searchGames(text:string, page:number = 1) {
        try {
            const filter = `filters[title][$contains]=${text}`
            const pagination = `pagination[page]=${page}&pagination[pageSize]=30`
            const populate = "populate=*"
            
            const url = `/games?${filter}&${pagination}&${populate}`            
            const { data } = await api.get<GamesPagination>(url)
            return data

        } catch (error) {
            throw error
        }
    }

    async getGameBySlug(slug: GamesT['attributes']['slug']) {
        try {
            const filter = `filters[slug][$eq]=${slug}`
            const populateGame = "populate[0]=wallpaper&populate[1]=portada&populate[2]=screenshots&populate[3]=platform"
            const populatePlatform = "populate[4]=platform.icon"
            const url = `/games?${filter}&${populateGame}&${populatePlatform}`

            const { data : {data} } = await api.get<{data: GamesByPlatformPopulate[]}>(url)
            return data[0]

        } catch (error) {
            throw error
        }
    }

    async getGameById(id : GamesT["id"]) {
        try {
            const populate = `populate[0]=portada&populate[1]=platform`
            const url = `/games/${id}?${populate}`
            
            const { data: {data} } = await api.get<{data: GamesByPlatformPopulate}>(url, { requiresAuth: true} as CustomAxiosRequestConfig)
            return data

        } catch (error) {
            throw error
        }
    }
}