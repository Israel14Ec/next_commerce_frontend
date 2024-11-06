import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeNameForm.form";
import { User } from "@/src/api"
import { Form } from "semantic-ui-react";
import { UserLogged } from "@/src/types";
import styles from "./ChangeNameForm.module.scss";
import { toast } from "react-toastify";

type ChangeNameForm = {
  userData: UserLogged;
};

const userController = new User()

export function ChangeNameForm({ userData }: ChangeNameForm) {

  const formik = useFormik({
    initialValues: initialValues({
      firstname: userData.firstname,
      lastname: userData.lastname,
    }),
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.updateMe(userData.id, formValue)
        toast.success("Se actualizo correctamente")
      } catch (error) {
        console.error(error);
        toast.error("No se pudo actualizar")
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <label htmlFor=""></label>
      <div className={styles.content}>
        <Form.Input
          name="firstname"
          placeholder="Nombre"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          placeholder="Apellido"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
        <Form.Button type="submit" loading={formik.isSubmitting}>
          Enviar
        </Form.Button>
      </div>
    </Form>
  );
}
