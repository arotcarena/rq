type Props = {
    filters: {[key: string]: any},
    setFilterValue: (name: string, value: any) => void
}

export const PriceFilter = ({
    filters,
    setFilterValue
}: Props) => {
    const handleChange = (e: any) => {
        const value = e.target.value;

        setFilterValue('min_price', parseInt(value.split('_')[0]));
        setFilterValue('max_price', parseInt(value.split('_')[1]));
    }

    return (
        <div className="form-group">
            <select className="form-control" name="price_filter" value={filters.min_price + '_' + filters.max_price} onChange={handleChange}>
                <option>Filter by price</option>
                <option value="0_5000">0 € - 50 €</option>
                <option value="5000_10000">50 € - 100 €</option>
                <option value="10000_20000">100 € - 200 €</option>
                <option value="20000_50000">200 € - 500 €</option>
                <option value="50000_100000">500 € - 1 000 €</option>
                <option value="100000_200000">1 000 € - 2 000 €</option>
                <option value="200000_500000">2 000 € - 5 000 €</option>
                <option value="500000_1000000">5 000 € - 10 000 €</option>
            </select>
        </div>
    )
}