export function traductionRegisterErrors (error:string) : string{
    
    switch (error) {
        case "Email or Username are already taken":
            return "El email o usuario ya esta registrado"
    
        default:
            return "Algo salió mal, no se pudo crear la cuenta"
    }
}

export function traductionLoginErrors(error:string) {
    
    switch (error) {
        case "Invalid identifier or password":
            return "Credenciales inválidas"
        default:
            return "Algo salió mal, no se pudo iniciar sesión" 
    }
}