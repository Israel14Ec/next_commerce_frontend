import { Login } from '@/src/types'
import * as Yup from 'yup'

export const initialValues : Login = {
    identifier: "",
    password: ""
}

export const validationSchema = Yup.object({
    identifier: Yup.string().required("Ingrese el correo o username"),
    password: Yup.string().required("Ingrese la contraseña")
})
