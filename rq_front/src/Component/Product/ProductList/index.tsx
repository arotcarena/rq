import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductType, deleteProduct } from "../../../queries/productQueries"
import { ProductCard } from "./ProductCard";

type Props = {
    products: ProductType[],
    isFetching: boolean
};

export const ProductList = ({
    products,
    isFetching = false
}:Props) => {

    const queryClient = useQueryClient();

    const {mutate: removeProduct, isSuccess, reset, isPending: isRemoving} = useMutation({
        mutationFn: async (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product_index'] });
        }
    });

    return (
        <>
            {
                isSuccess && <div>
                    <span>Product deleted with success !</span>
                    <span> </span>
                    <button onClick={reset}>Close</button>
                </div>
            }
            {
                isRemoving && <div>Removing...</div>
            }
            <div className={'product-list' + (isFetching ? ' loading': '')}>
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} onRemove={removeProduct} />
                    ))
                }
            </div>
        </>
    )
}