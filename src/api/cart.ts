import api, { CustomAxiosRequestConfig} from "../lib/axios";
import { AddresT, CartT, GamesQuantity, GamesT, UserLogged } from "../types";

export class Cart {

    add(gameId : GamesT['id']) {
        
        const games = this.getAll()
        const objIndex = games.findIndex((game) => game.id === gameId)

        if(objIndex < 0) {
            games.push({
                id: gameId,
                quantity: 1
            })
        } else {
            const game = games[objIndex]
            games[objIndex].quantity = game.quantity + 1
            
        }

        localStorage.setItem("cart", JSON.stringify(games))
    }

    getAll() : CartT[] {
        try {            
            const response = localStorage.getItem('cart')
    
            if(!response) {
                return []
            }
    
            return JSON.parse(response)
        } catch (error) {
            console.error(error);
            return []
        }
        
    }

    count() {
        const cartItems = this.getAll()

        if(!cartItems.length) {
            return 0
        }

        return cartItems.reduce(( acc, item) => acc + item.quantity, 0)
    }

    changeQuantity(gameId:GamesT['id'], quantity:number) {

        const games = this.getAll()
        const objIndex = games.findIndex((game) => game.id == gameId)
        
        if (objIndex !== -1) {
            games[objIndex].quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(games));
        }
    }

    delete(gameId:GamesT['id']) {

        const games = this.getAll()
        const updateGames = games.filter((game) => game.id !== gameId)
        localStorage.setItem("cart", JSON.stringify(updateGames))

    }

    
    deleteAll() {
        localStorage.removeItem("cart")
    }

    //Crear orden, el ID de paypal se guarda en la DB
    async paymenCart (tokenPayment: string, products : GamesQuantity[], idUser: UserLogged['id'], 
        address: AddresT, totalPaymant: number) 
    {
        try { 

            const data = {
                user: idUser,
                totalPayment: totalPaymant,
                idPayment: tokenPayment,
                addressShoping: address,
                products: products
            }

            const url = `/orders`
            const { data : dataOrder } = await api.post(url, {data}, { requiresAuth: true} as CustomAxiosRequestConfig)
            return dataOrder
            
        } catch (error) {
            throw error
        }
    }
} 