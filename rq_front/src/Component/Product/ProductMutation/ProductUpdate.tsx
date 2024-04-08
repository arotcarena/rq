import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { showProduct, updateProduct } from "../../../queries/productQueries";
import { ProductForm } from "./ProductForm";

export const ProductUpdate = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    if(!id) {
        throw new Error('no id provided');
    }

    const {data: product, isFetching} = useQuery({
        queryKey: ['product_show', id],
        queryFn: async () => showProduct(parseInt(id)),
        initialData: null
    });

    const queryClient = useQueryClient();

    const {mutate: onSubmit, isPending: isUpdating, isSuccess} = useMutation({
        mutationFn: async (formData: object) => updateProduct(formData, parseInt(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product_index']});
            navigate('/products');
        }
    })

    return (
        <>
            {
                isFetching && <div>loading...</div>
            }
            {
                product && (
                    <ProductForm product={product} onSubmit={onSubmit} isLoading={isUpdating} />
                )
            }
        </>
    )
}