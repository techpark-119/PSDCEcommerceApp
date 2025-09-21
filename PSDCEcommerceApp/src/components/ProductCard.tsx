import type { Product } from '../types/product';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <>
            <div className="boder-green-200 overflow-hidden rounded-lg border bg-white">
                <img
                    className="h-48 w-full object-cover"
                    src={product.thumbnail}
                    alt={product.title}
                />
                <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        {product.title}
                    </h3>
                    <p className="mb-4 text-gray-600">${product.price}</p>
                    <form action={`/product/${product.id}`}>
                        <button className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            Buy Now
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
