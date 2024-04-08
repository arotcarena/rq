import { useNavigate } from "react-router";
import { ProductType } from "../../../queries/productQueries"

type Props = {
    product: ProductType,
    onRemove: (id: number) => void
};

export const ProductCard = ({
    product,
    onRemove
}: Props) => {

    const navigate = useNavigate();

    const handleRemove = (e: any) => {
        e.preventDefault();
        if(window.confirm('Voulez-vous supprimer ce produit ?')) {
            onRemove(product.id);
        }
    };

    const handleEdit = (e: any) => {
        e.preventDefault();
        navigate('/products/'+product.id + '/update');
    }

    return (
        <div className="product-card">
            <img src={product.picture} />
            <div className="product-card-body">
                <h3>{product.designation}</h3>
                <div>{product.brand}</div>
                <div style={{fontSize: '1.5em'}}>
                    {
                        new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(product.price / 100)
                    }
                </div>
                <div>{(new Date(product.createdAt).toLocaleDateString('fr'))}</div>
            </div>
            <div className="product-card-footer">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleRemove}>Delete</button>
            </div>
        </div>
    )
}