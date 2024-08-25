import React, { useEffect, useState } from 'react';
import productAPI from '../api/productApi';
import ProductCard from './ProductCard';
import categoryAPI from '../api/categoryApi';
import '../styles/ProductCollection.css';

function ProductCollection({ categoryId }) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productAPI.getProductsByCategoryId(categoryId);
                setProducts(data);
                const categoryData = await categoryAPI.getCategoryById(categoryId);
                setCategory(categoryData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='collection'>
            <h2 className='category-name'>Soothing aromas to calm you down.</h2>
            <ul className='product-collection-list'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
};

export default ProductCollection
