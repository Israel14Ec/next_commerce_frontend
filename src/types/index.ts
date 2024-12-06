export type UserRegister = {
    username: string
    email: string
    password: string
    firstname: string
    lastname: string
}

export type Login = Pick<UserRegister, 'password'> & {identifier: string}
export type UserLogged = Pick<UserRegister, 'email'|'firstname'|'lastname'|'username'> & { 
    id: number
    createdAt: Date 
}

// Usa Partial para hacer opcionales las propiedades firstname y lastname
export type UserUpdate = Partial<Pick<UserLogged, 'firstname' | 'lastname'>>


// Platform ----------------------------------------------------------
export type PlatformType = {
    attributes: {
        title: string
        slug: string
        publishedAt: Date
        order: number
        icon: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
    }
    id: number
}

//Address 
export type AddressDraft = {
    title: string
    name: string
    address: string
    city: string
    state: string
    postal_code: string
    phone: string
    user: number|null
}

export type AddresT = {
    attributes: AddressDraft
    id: number
}

//Games
export type GamesT = {
    id:number
    attributes: {
        title: string
        video: string
        summary: string
        slug:string
        price: number
        discount: number
        releaseDate: string
        publishedAt: Date
        createdAt: Date
        wallpaper: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
        portada: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
    }
}

//Screanshot
export type Screenshots = {
    screenshots: {
        data: [
            {attributes: {
                url: string
            }}
        ]
    }
}


//Paginación
export type Pagination = {
    page: number,
    pageSize: number,
    pageCount:number,
    total: number
}

//games pagination
export type GamesPagination = {
    data: [GamesT]
    meta: {pagination: Pagination}
}

//games by platform 
export type GamesByPlatformPopulate = Omit<GamesT, 'attributes'> & {
    attributes: GamesT['attributes'] & Screenshots & {
        platform: {
            data: PlatformType
        }
    }
};

//WishList
export type WishListT = {
    attributes: {
        createdAt: Date
        publishedAt: Date
        updatedAt: Date
    }
    id: number
}

//Wishlist whit game

export type WishListWithGame = Omit<WishListT, "attributes"> & {
    attributes: WishListT['attributes'] & {
        game: {
            data: GamesT
        }
    }
}

//Carrito 
export type CartT = {
    id: GamesT['id']
    quantity: number
}

//GamesT quantity
export type GamesQuantity = GamesByPlatformPopulate & {
    quantity: number
}

//Type de Paypal:

export type PayPalOrder = {
    id?: string;
    status?: string;
};


//orders

export type OrderT = {
    id: number
    attributes: {
        totalPayment: number
        idPayment: string
        products: [
            GamesQuantity
        ]
        addressShoping: AddresT
        createdAt: Date
    }
}
  