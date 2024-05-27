import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductType, deleteProduct } from "../../../queries/productQueries"
import { ProductCard } from "./ProductCard";

type Props = {
    products: ProductType[],
    isFetching: boolean,
    filters: object
};

export const ProductList = ({
    products,
    isFetching = false,
    filters
}:Props) => {

    const queryClient = useQueryClient();

    const {mutate: removeProduct, isSuccess, reset, isPending: isRemoving} = useMutation({
        mutationFn: async (id: number) => {
            deleteProduct(id);
            return id;
        },
        onMutate: (id: number) => {
            queryClient.setQueryData(['product_index', filters], (result: any) => {
                return {
                    ...result,
                    items: result.items.filter((item: {id: number}) => item.id !== id)
                }
            })
        },
        onSettled: () => {
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