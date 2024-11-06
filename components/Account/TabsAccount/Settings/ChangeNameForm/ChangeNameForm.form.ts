import { UserLogged, UserUpdate } from "@/src/types"
import * as Yup from "yup"


export const initialValues = ({firstname = "", lastname = ""} : UserUpdate) => {
    return {
        firstname,
        lastname
    }
}

export const validationSchema = Yup.object({
    firstname: Yup.string().required("Ingrese el nombre"),
    lastname: Yup.string().required("Ingrese el nombre")
})