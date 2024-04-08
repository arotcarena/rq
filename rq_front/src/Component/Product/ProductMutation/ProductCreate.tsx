import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../queries/productQueries";
import { ProductForm } from "./ProductForm";
import { useNavigate } from "react-router";

export const ProductCreate = () => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {mutate: onSubmit, isPending: isUpdating, isSuccess} = useMutation({
        mutationFn: async (formData: object) => createProduct(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product_index']});
            navigate('/products');
        }
    });

    return (
        <div>
            <h1>Create Product</h1>
            <ProductForm onSubmit={onSubmit} isLoading={isUpdating} />
        </div>
    )
}