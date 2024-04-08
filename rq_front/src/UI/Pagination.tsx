type Props = {
    itemsPerPage: number,
    count: number,
    lastPage: number,
    page: number,
    setFilterValue: (key: string, value: any) => void
};

export const Pagination = ({
    itemsPerPage,
    count,
    lastPage,
    page,
    setFilterValue
}: Props) => {

    const handleNext = (e: any) => {
        e.preventDefault();
        setFilterValue('page', page + 1);
    }
    const handlePrevious = (e: any) => {
        e.preventDefault();
        setFilterValue('page', page - 1);
    }

    return (
        <div className="pagination">
            <div className="pagination-results">
                {itemsPerPage > count ? count: itemsPerPage} of {count} results
            </div>
            <div className="pagination-arrows">
                {
                    page > 1 && (
                        <button onClick={handlePrevious} className="arrow">{'<'}</button>
                    )
                }
                <span>{page} / {lastPage}</span>
                {
                    page < lastPage && (
                        <button onClick={handleNext} className="arrow">{'>'}</button>
                    )
                }
            </div>
        </div>
    )
}