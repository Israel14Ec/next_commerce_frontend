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
    }
}