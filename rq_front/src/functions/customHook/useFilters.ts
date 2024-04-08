import { useState } from "react";

export const useFilters = (
    initialFilters: object = {},
): {
    filters: object,
    setFilterValue: (name: string, value: any) => void
} => {
    const [filters, setFilters] = useState<object>(initialFilters);

    const setFilterValue = (name: string, value: any) => {
        setFilters(filters => ({
            ...filters,
            page: 1,
            [name]: value
        }));
    };

    return {
        filters,
        setFilterValue
    }
}