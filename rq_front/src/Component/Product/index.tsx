import { useQuery } from "@tanstack/react-query";
import { ProductType, loadProducts } from "../../queries/productQueries"
import { Pagination } from "../../UI/Pagination";
import { ProductList } from "./ProductList";
import { useFilters } from "../../functions/customHook/useFilters";
import { GetCollectionPaginatedResponse } from "../../functions/api/apiPlatformConversion/paginationConvertor";
import { Filters } from "./Filters";


export const Product = () => {

    const {filters, setFilterValue, countFilters, resetFilters} = useFilters({
        itemsPerPage: 20,
        page: 1,
        designation: '',
        min_price: '',
        max_price: '',
    });

    const {data: {items: products, count, lastPage, page, itemsPerPage}, isFetching} = useQuery<unknown, unknown, GetCollectionPaginatedResponse<ProductType>>({
        queryKey: ['product_index', filters],
        queryFn: async () => loadProducts(filters),
        initialData: {
            items: [],
        }
    });

    return (
        <div>
            <h1>Products</h1>

            {
                countFilters > 0 && (
                    <button onClick={resetFilters}>Delete filters ({countFilters})</button>
                )
            }

            <Filters filters={filters} setFilterValue={setFilterValue} />
            <ProductList products={products} isFetching={isFetching} filters={filters} />
            
            {
                products && count > 1 && (
                    <Pagination 
                        setFilterValue={setFilterValue}
                        itemsPerPage={itemsPerPage}
                        count={count}
                        lastPage={lastPage}
                        page={page}
                    />
                )
            }
        </div>
    )
}