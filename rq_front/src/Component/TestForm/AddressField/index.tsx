import { PropsWithChildren, useState } from "react";
import { AddressForm } from "./AddressForm";
import { createPortal } from "react-dom";

export type Address = {
    lineOne: string,
    lineTwo: string,
    postcode: string,
    city: string,
    country: string,
}


type Props = PropsWithChildren<{
    validation: any,
    name: string
}>;

export const AddressField = ({
    validation,
    name,
    children
}: Props) => {

    const [formIsOpen, setFormIsOpen] = useState(false);

    const handleSubmit = (formData: object) => {
        validation.setFieldValue(name, formData);
        setFormIsOpen(false);
    }

    if(formIsOpen) {
        return (
            createPortal((
                <AddressForm
                    address={validation.values[name]}
                    onSubmit={handleSubmit}
                >
                    {children}
                </AddressForm>
            ), document.body)
        )
    }

    return (
        <div>
            {
                validation.values[name] && (
                    <div>
                        <div>
                            <div>{validation.values[name].lineOne}</div>
                            <div>{validation.values[name].lineTwo}</div>
                            <div>{validation.values[name].postcode}</div>
                            <div>{validation.values[name].city}</div>
                            <div>{validation.values[name].country}</div>
                        </div>
                        <button onClick={() => setFormIsOpen(true)} type="button">Modifier</button>
                    </div>
                )
            }
            {
                validation.errors[name] && validation.touched[name] && (
                    <div>{validation.errors[name]}</div>
                )
            }
            <div>
                <button type="button" onClick={() => setFormIsOpen(true)}>+ Ajouter</button>
            </div>
        </div>
    )


}