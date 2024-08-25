import React from 'react'
import NavBar from '../components/NavBar'
import productAPI from '../api/productApi'
import categoryAPI from '../api/categoryApi'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import '../styles/AllProducts.css'

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
          const response = await productAPI.getAllProducts();
          setProducts(response);
          setFilteredProducts(response);
          const categoryData = await categoryAPI.getAllCategories();
          setCategories(categoryData);
        };
        fetchProduct();
      }, []);

      const handleCategoryChange = (e) => {
        const filtered = products.filter((product) => {
          if (e.target.value === '') return true;
          return product.category.name === e.target.value;
        });
        setFilteredProducts(filtered);
      };

      const handleSortChange = (e) => {
        const sortOption = e.target.value;
        const sortedProducts = [...filteredProducts];
        if (sortOption === 'price-asc') {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
          sortedProducts.sort((a, b) => b.price - a.price);
        } 
        setFilteredProducts(sortedProducts);
      }

  return (
    <div className='all-products'>
      <NavBar />
      <h1>Products</h1>
      <div className='product-options'>
        <div className='filter-options'>
        <label htmlFor='category-filter'>Filter by Category:</label>
          <select id='category-filter' onChange={handleCategoryChange}>
          <option value=''>All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='sort-options'>
        <label htmlFor='sort'>Sort by:</label>
          <select id='sort' onChange={handleSortChange}>
            <option value=''>None</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className='product-list'>
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            )
            )}
        </div>
    </div>
  )
}

export default AllProducts
