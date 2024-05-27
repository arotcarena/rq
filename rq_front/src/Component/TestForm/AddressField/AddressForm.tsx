import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField } from "../../../UI/Form/TextField";
import { Address } from ".";
import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
    address?: Address
    onSubmit: (formData: object) => void,
}>;

export const AddressForm = ({
    address,
    onSubmit,
    children
}: Props) => {

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: address ?? {
            lineOne: '',
            lineTwo: '',
            postcode: '',
            city: '',
            country: '',
        },
        validationSchema: Yup.object({
            lineOne: Yup.string().required(),
            lineTwo: Yup.string(),
            postcode: Yup.string().required(),
            city: Yup.string().required(),
            country: Yup.string().required(),
        }),
        onSubmit
    });

    return (
        <form style={{margin: '40px', maxWidth: '350px'}} onSubmit={validation.handleSubmit}>

            {children}

            <TextField
                validation={validation}
                name="lineOne"
            >
                Ligne 1
            </TextField>

            <TextField
                validation={validation}
                name="lineTwo"
            >
                Ligne 2
            </TextField>

            <TextField
                validation={validation}
                name="postcode"
            >
                Code postal
            </TextField>

            <TextField
                validation={validation}
                name="city"
            >
                Ville
            </TextField>

            <TextField
                validation={validation}
                name="country"
            >
                Pays
            </TextField>

            <button type="submit">Valider</button>

        </form>
    )
}