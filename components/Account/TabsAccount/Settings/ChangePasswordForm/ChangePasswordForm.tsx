import { Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { validationSchema, initialValues } from "./ChangePassword.form"
import { User } from "@/src/api"
import styles from "./ChangePasswordForm.module.scss"
import { UserLogged } from "@/src/types"
import { toast } from "react-toastify"
import { useAuth } from "@/src/Hooks"

type ChangePasswordFormProps = {
    idUser: UserLogged['id']
}

const userController = new User()

export function ChangePasswordForm({idUser} : ChangePasswordFormProps) {

    const { logout} = useAuth()

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        onSubmit: async (formData) => {
            try {
                await userController.updateMe(idUser, formData)
                toast.success("Se cambio la contraseña correctamente")
                logout() //Cierra la sesion
            } catch (error) {
                console.error(error);
                toast.error("Algo salió mal no se pudo cambiar la contraseña")
            }
        }
    })
  return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <label htmlFor="password">Cambiar contraseña</label>
        <Form.Input 
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
        />
            <Form.Input 
            type="password"
            name="repeatPassword"
            placeholder="Repetir contraseña"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
        />

        <Form.Button type="submit">
            Enviar
        </Form.Button>
    </Form>
  )
}
