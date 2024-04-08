import { useMemo, useState } from "react";

const countFilters = (filters: object, initialFilters: {[key: string]: any}): number => {
    let counted: string[] = [];
    for(const [key, value] of Object.entries(filters)) {
        if(
            !counted.includes(key.replace('max_', 'min_'))
            &&
            !counted.includes(key.replace('min_', 'max_'))
            &&
            key !== 'sortBy'
            && 
            key !== 'page'
            &&
            key !== 'itemsPerPage'
            &&
            initialFilters[key] !== value
        ) {
            counted.push(key);
        }
    }

    return counted.length;
}



export const useFilters = (
    initialFilters: object = {},
): {
    filters: object,
    setFilterValue: (name: string, value: any) => void,
    countFilters: number,
    resetFilters: () => void
} => {
    const [filters, setFilters] = useState<object>(initialFilters);
    const count = useMemo(() => {
        return countFilters(filters, initialFilters);
    }, [filters, initialFilters]);

    const setFilterValue = (name: string, value: any) => {
        setFilters(filters => ({
            ...filters,
            page: 1,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    }

    return {
        filters,
        setFilterValue,
        countFilters: count,
        resetFilters
    }
}