import { AddressDraft, AddresT } from "@/src/types"
import * as Yup from "yup"

// ? en ts el ? marca un type ? como opcional
export const initialValues = (address?: AddressDraft): AddressDraft => {
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        postal_code: address?.postal_code || "",
        phone: address?.phone || "",
        user: address?.user || null
    };
};


export const validationSchema = Yup.object({
    title: Yup.string().required("*"),
    name: Yup.string().required("*"),
    address: Yup.string().required("*"),
    city: Yup.string().required("*"),
    state: Yup.string().required("*"),
    postal_code: Yup.string().required("*"),
    phone: Yup.string().required("*") .matches(/^\d{10}$/, "Ingrese 10 dígitos"),
})