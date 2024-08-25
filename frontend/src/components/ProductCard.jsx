import React from 'react'
import '../styles/ProductCard.css';
import { useNavigate } from 'react-router';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  }

  return (
    <div className="product-card" onClick={() => handleProductClick(product)}>
      <img src={`https://storage.cloud.google.com/zen-recovery-images/${product.picture}`} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};
export default ProductCard
