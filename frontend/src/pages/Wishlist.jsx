import React from 'react'
import NavBar from '../components/NavBar'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import '../styles/Wishlist.css';
import { Favorite } from '@mui/icons-material';
import ProductListItem from '../components/ProductListItem';

function Wishlist() {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);
  return (
    <div className='wishlist-page'>
        <NavBar />
        <div className='wishlist-header'>
            <h1>Your Wishlist</h1>
            <Favorite fontSize="large"/>
        </div>
        <div className='wishlist-products'>
            {wishlist.products.map((product) => (
                <ProductListItem key={product.id} product={product} />
            ))}
        </div>

      
    </div>
  )
}

export default Wishlist
