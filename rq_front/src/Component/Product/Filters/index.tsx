import { QFilterDelayed } from "../../../UI/filters/QFilterDelayed";
import { PriceFilter } from "./PriceFilter";

type Props = {
    filters: {[key: string]: any},
    setFilterValue: (key: string, value: any) => void
};

export const Filters = ({
    filters,
    setFilterValue
}: Props) => {

    const handleChange = (e: any) => {
        e.preventDefault();
        setFilterValue(e.target.name, e.target.value);
    }

    return (
        <div className="search-filters-wrapper">
            <div className="search-filters">
                <QFilterDelayed
                    name="designation"
                    value={filters.designation}
                    setFilterValue={setFilterValue}
                    >
                    Designation
                </QFilterDelayed>
                <PriceFilter
                    filters={filters}
                    setFilterValue={setFilterValue}
                />
            </div>
            <div className="search-filters">
                <div className="form-group">
                    <select className="form-control" name="itemsPerPage" onChange={handleChange}>
                        <option>Items per page</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control" name="sortBy" onChange={handleChange}>
                        <option>Sort</option>
                        <option value="price_ASC">Price ASC</option>
                        <option value="price_DESC">Price DESC</option>
                        <option value="createdAt_ASC">CreatedAt ASC</option>
                        <option value="createdAt_DESC">CreatedAt DESC</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

