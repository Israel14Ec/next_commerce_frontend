import { Form } from "semantic-ui-react"
import styles from "./ChangeEmailForm.module.scss"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangEmailForm.form"
import { User } from "@/src/api"
import { UserLogged } from "@/src/types"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { useAuth } from "@/src/Hooks"

const userController = new User()

type ChangeEmailFormProps = {
    idUser: UserLogged['id']
}

export function ChangeEmailForm({idUser} : ChangeEmailFormProps) {

    const { updateUser} = useAuth()
    
    const formik = useFormik( {
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await userController.updateMe(idUser, formValue)
                formik.handleReset(undefined)
                toast.success("Se cambió el correo")
                updateUser("email", formValue.email)
            } catch (error) {
                console.error(error);
                if(isAxiosError(error) && error.response) {
                    if(error.response.data.error.message === "Email already taken") {
                        toast.error("El email ya fue registrado")
                        return
                    }
                    toast.error("No se pudo cambiar el correo")
                }
            }
        }
    })
    
    return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <label htmlFor="email">Cambiar correo electrónico</label>
        <Form.Input 
            name="email" 
            placeholder="Nuevo correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}    
        />
        <Form.Input 
            name="repeatEmail" 
            placeholder="Repetir correo electrónico"
            value={formik.values.repeatEmail}
            onChange={formik.handleChange}
            error={formik.errors.repeatEmail}    
        />
        <Form.Button type="submit">
            Enviar
        </Form.Button>
    </Form>
  )
}
