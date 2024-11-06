import { jwtDecode } from "jwt-decode";

export class Token {

    setToken(token: string) {
        localStorage.setItem("AUTH_TOKEN", token)
    }
    getToken() {
        return localStorage.getItem("AUTH_TOKEN")
    }
    hasExpired(token: string) {
        const tokenDecode = jwtDecode(token)
        const expireDate = tokenDecode.exp! * 1000
        const currentDate = new Date().getTime()

        if(currentDate > expireDate) {
            return true
        }

        return false
    }
    removeToken() {
        localStorage.removeItem("AUTH_TOKEN")
    }
}