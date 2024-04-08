export const convertFiltersToApiFilters = (
    filters: object
): object => {
    let apiFilters = {};
    for(const [name, value] of Object.entries(filters)) {
        let apiFilterName = name;
        let apiFilterValue = value;

        if(name.includes('min_')) {
            apiFilterName = name.replace('min_', '') + '[gt]';
        } else if(name.includes('max_')) {
            apiFilterName = name.replace('max_', '') + '[lt]';
        } else if(name === 'sortBy') {
            const sortField = value.split('_')[0];
            const dir = value.split('_')[1];
            apiFilterName = 'order[' + sortField + ']';
            apiFilterValue = dir;
        }

        apiFilters = {
            ...apiFilters,
            [apiFilterName]: apiFilterValue
        };
    }
    return apiFilters;
}