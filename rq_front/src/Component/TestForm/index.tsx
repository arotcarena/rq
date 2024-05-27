import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField } from "../../UI/Form/TextField";
import { AddressField } from "./AddressField";

export const TestForm = () => {

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            socialName: '',
            identificationNumber: '',
            address: null,
        },
        validationSchema: Yup.object({
            socialName: Yup.string().required(),
            identificationNumber: Yup.string().required(),
            address: Yup.object().required()
        }),
        onSubmit: (formData: any) => console.log(formData)
    });

    return (
        <form onSubmit={validation.handleSubmit}>

            <TextField
                validation={validation}
                name="socialName"
            >
                Raison sociale
            </TextField>

            <TextField
                validation={validation}
                name="identificationNumber"
            >
                Numéro Siret
            </TextField>

            <AddressField
                validation={validation}
                name="address"
            >
                Adresse du siège social
            </AddressField>

            <button style={{margin: '30px 0'}} type="submit">Valider</button>

        </form>
    )
}