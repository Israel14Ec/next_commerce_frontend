import { Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./AddressForm.form"
import { Address } from "@/src/api"
import { AddressDraft, AddresT } from "@/src/types"
import { toast } from "react-toastify"

type AddressFormprops = {
    onClose: () => void
    userId: AddressDraft['user']
    onReload: () => void
    idAddress?:AddresT["id"]  // Propiedad opcional
    address?:AddresT["attributes"] // Propiedad opcional
}

const addressController = new Address()

export function AddressForm({onClose, userId, onReload, idAddress, address}:AddressFormprops) {

    
    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                //Actualizar
                if(idAddress) {
                    await addressController.update({...formValue,
                        user:userId
                    }, idAddress)
                    toast.success("Se actualizó los datos de dirección")
                } 
                //Agregar
                else {
                
                    await addressController.create({...formValue,
                        user: userId
                    })
                    toast.success("Se agrego la dirección")
                    
                }

                //Vuelve a cargar la consulta, cambiando el estado la consulta esta en un useEffect en el componente TabsAccount
                onReload() 
                onClose()

            } catch (error) {
                console.error(error);
                toast.error("No se pudo realizar la acción")
                
            }   
        }
    })


  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
            name="title" 
            placeholder="Nombre de la dirección"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}    
        />
        <Form.Group widths="equal" >
            <Form.Input 
                name="name" 
                placeholder="Nombre y apellidos"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}      
            />
            <Form.Input 
                name="address" 
                placeholder="Dirección"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address}      
            />
        </Form.Group>
        <Form.Group widths="equal" >
            <Form.Input 
                name="state" 
                placeholder="Provincia"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.errors.state}      
            />
            <Form.Input 
                name="city" 
                placeholder="Ciudad"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.errors.city}      
            />
        </Form.Group>
        <Form.Group widths="equal" >
            <Form.Input 
                name="postal_code" 
                placeholder="Código postal"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                error={formik.errors.postal_code}      
            />
            <Form.Input 
                name="phone" 
                placeholder="Teléfono"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}      
            />
        </Form.Group>

        <Form.Button type="submit" loading={formik.isSubmitting} fluid>
            Enviar
        </Form.Button>
    </Form>
  )
}
