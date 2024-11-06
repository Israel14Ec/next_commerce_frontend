import { UserLogged } from "@/src/types"
import * as Yup from "yup"

type emailChangeType =  Pick<UserLogged, "email"> & {
    repeatEmail: string
}

export const initialValues : emailChangeType = {
    email: "",
    repeatEmail:"",
}

export const validationSchema = Yup.object({
    email: Yup.string().email("Ingrese el formato de email").required("Ingrese el email"),
    repeatEmail: Yup.string()
        .email("Ingrese con formato de email")
        .required("Ingrese el email")
        .oneOf([Yup.ref("email")], "Los emails no son iguales")
})
