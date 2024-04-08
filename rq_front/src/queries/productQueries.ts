import { convertFiltersToApiFilters } from "../functions/api/apiPlatformConversion/filtersConvertor";
import { GetCollectionPaginatedResponse, resolveCollectionPaginatedInfos } from "../functions/api/apiPlatformConversion/paginationConvertor";
import { customFetch } from "../functions/api/customFetch"

const baseEndpoint = 'https://localhost:8000/api/products';



export type ProductType = {
    id: number,
    designation: string,
    price: number,
    brand: string,
    picture: string,
    [key: string]: any
};




export const loadProducts = async (filters: object): Promise<GetCollectionPaginatedResponse<ProductType>> => {

    const apiFilters = convertFiltersToApiFilters(filters);

    try {
        const response = await customFetch(baseEndpoint, apiFilters, 'GET', {
            'Accept': 'application/ld+json'
        });
        return resolveCollectionPaginatedInfos<ProductType>(response);
    } catch(e) {
        throw e;
    }
}

export const showProduct = (id: number): Promise<ProductType> => {
    return customFetch(baseEndpoint + '/' + id, {}, 'GET', {
        'Accept': 'application/ld+json'
    });
}

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await customFetch(baseEndpoint + '/' + id, {}, 'DELETE', {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/json'
        });
    } catch(e) {
        //
    }
}

export const updateProduct = async (formData: object, id: number): Promise<void> => {
    try {
        await customFetch(baseEndpoint + '/' + id, formData, 'PATCH', {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/merge-patch+json'
        });
    } catch(e) {
        //
    }
} 

export const createProduct = async (formData: object): Promise<void> => {
    try {
        await customFetch(baseEndpoint, formData, 'POST', {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/ld+json'
        });
    } catch(e) {
        //
    }
} 

