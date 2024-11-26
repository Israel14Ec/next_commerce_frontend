import { CartT, GamesT } from "../types";

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
} 