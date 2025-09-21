import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import type { Product } from '../types/product';
import HeroSection from '../components/Hero';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!product) return <p className="p-4">Product not found.</p>;

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <HeroSection />
                <div className="container mx-auto max-w-6xl p-6">
                    <div className="flex flex-col overflow-hidden rounded-lg border border-green-200 bg-white lg:flex-row">
                        <div className="lg:w-1/2">
                            <img
                                className="h-96 w-full object-cover"
                                src={product.thumbnail} alt={product.title}
                            />
                        </div>
                        <div className="p-6 lg:w-1/2">
                            <h2 className="mb-4 text-3xl font-bold text-gray-800">{product.title}</h2>
                            <p className="mb-2 text-sm text-gray-500">Category: {product.category}</p>
                            <p className="mb-6 text-gray-700">{product.description}</p>
                            <p className="mb-6 text-2xl font-semibold text-gray-800">${product.price}</p>
                            {/* Buy Now Button */}
                            <button className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ProductDetails;
