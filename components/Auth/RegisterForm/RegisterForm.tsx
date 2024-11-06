"use client"

import { useRouter } from 'next/navigation'
import { Form, FormInput } from "semantic-ui-react"
import { useFormik } from 'formik'
import { Auth } from "@/src/api"
import { initialValues, validationSchema } from "./RegisterForm.form"
import { toast } from "react-toastify"
import { traductionRegisterErrors } from "@/src/locales/es"

const authController = new Auth()

export function RegisterForm() {

  const router = useRouter();

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      validateOnChange: false,
      onSubmit: async (formData) => {
          try {
              await authController.register(formData);
              toast.success('Se creo la cuenta correctamente');
              router.push("/join/sign-in");
              
          } catch (error) {
              if (error instanceof Error) {
                  toast.error(traductionRegisterErrors(error.message)); 
              } 
              console.error("El error es" ,error);
          }
      }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <FormInput
          name="firstname"
          type="text"
          placeholder="Ingrese su nombre"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <FormInput
          name="lastname"
          type="text"
          placeholder="Ingrese su apellido"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
      </Form.Group>

      <FormInput
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />

      <FormInput
        name="email"
        type="text"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />

      <FormInput
        name="password"
        type="password"
        placeholder="**********"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  )
}
