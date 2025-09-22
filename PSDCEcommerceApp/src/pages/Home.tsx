import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import HeroSection from '../components/Hero';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroSection />
            {loading ? (
                <p className="p-4 text-center">Loading...</p>
            ) : (
                <div className="container mx-auto bg-white p-6">
                    <h1 className="mb-6 text-3xl font-bold text-gray-800">Featured Products</h1>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Home;
