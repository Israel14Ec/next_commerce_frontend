import * as Yup from "yup"

type ChangePsswordType = {
    password: string
    repeatPassword: string
}

export const initialValues : ChangePsswordType = {
    password:"",
    repeatPassword:""
}

export const validationSchema = Yup.object({
    password: Yup.string().required("*"),
    repeatPassword: Yup.string().required("*").oneOf([Yup.ref("password")], "Las contraseñas no son iguales")
})