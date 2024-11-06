"use client"

import { useRouter } from "next/navigation"
import { Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./LoginForm.form"
import { useAuth } from "@/src/Hooks"
import { Auth } from "@/src/api"
import { traductionLoginErrors } from "@/src/locales/es"
import { toast } from "react-toastify"

const authController = new Auth()

export function LoginForm() {

    const router = useRouter()
    const { login } = useAuth()
    
    const formik= useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { jwt } = await authController.login(formValue)
                login(jwt) //Mando al context
                router.push("/home")
                
            } catch (error) {
                if(error instanceof Error) {
                    toast.error(traductionLoginErrors(error.message))
                }
                console.error("Error ",error);
            }
        }
    })
  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
            name="identifier" 
            type="text"
            placeholder="Correo electrónico o nombre de usuario"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            error={formik.errors.identifier}
        />
        <Form.Input 
            name="password"
            type="password"
            placeholder="****************"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
        />
         <Form.Button 
            type="submit"
            fluid
            loading={formik.isSubmitting}
         >
            Entrar
         </Form.Button>
    </Form>
  )
}
