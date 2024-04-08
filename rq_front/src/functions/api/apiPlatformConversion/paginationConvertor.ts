export type GetCollectionPaginatedResponse<Item> = {
    items: Item[],
    count: number,
    lastPage: number,
    page: number,
    itemsPerPage: number
}

export const resolveCollectionPaginatedInfos = <Item>(
    response: {
        ['hydra:view']: {
            ['hydra:last']?: string,
            ['@id']: string,
        },
        ['hydra:totalItems']: number,
        ['hydra:member']: Item[]
    }
): GetCollectionPaginatedResponse<Item> => {
    const view = response['hydra:view'];
    const lastPage = view['hydra:last']?.split('page=')[1];
    const hydraId = view['@id'];
    const currentPage = hydraId.split('page=')[1];
    const itemsPerPage = hydraId.split('itemsPerPage=')[1].split('&')[0];

    return {
        items: response['hydra:member'],
        count: response['hydra:totalItems'],
        lastPage: lastPage ? parseInt(lastPage): 1,
        page: currentPage ? parseInt(currentPage): 1,
        itemsPerPage: parseInt(itemsPerPage)
    };
}