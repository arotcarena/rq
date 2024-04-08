import { useFormik } from "formik";
import { ProductType } from "../../../queries/productQueries"

type Props = {
    product?: ProductType,
    onSubmit: (formData: object) => void,
    isLoading: boolean
}

export const ProductForm = ({
    product,
    onSubmit,
    isLoading
}: Props) => {

    const validation = useFormik({
        initialValues: {
            designation: product?.designation || '',
            description: product?.description || '',
            price: product?.price || '',
            brand: product?.brand || '',
        },
        onSubmit,
      });

    return (
        <form onSubmit={validation.handleSubmit}>
            <input
                className="form-control"
                name="designation"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.designation}
                placeholder="designation"
            />

            <input
                className="form-control"
                name="brand"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.brand}
                placeholder="brand"
            />

            <textarea 
                name="description"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.description}
                placeholder="description"
            />

            <input
                className="form-control"
                name="price"
                type="number"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.price}
                placeholder="price"
            />
            
            <button type="submit">
                {
                    isLoading ? 'Loading...': 'Valider'
                }
            </button>
        </form>
    )
}