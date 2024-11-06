import { UserRegister } from "@/src/types"
import * as Yup from "yup"

export const initialValues:UserRegister = {
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: ""
}

export const validationSchema = Yup.object({
        email: Yup.string().email("Ingrese un email valido ").required("*"),
        username: Yup.string().required("*"),
        firstname: Yup.string().required("*"),
        lastname: Yup.string().required("*"),
        password: Yup.string().required("*"),
})
