import React from 'react'
import { Close } from '@mui/icons-material'
import '../styles/ProductListItem.css'
import { useDispatch } from 'react-redux';

function ProductListItem({product}) {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { item: product, quantity: 1 }
        })
    }
    const handleRemoveFromWishlist = () => {
        dispatch({
            type: 'REMOVE_FROM_WISHLIST',
            payload: product.id
        })
    }
  return (
    <div className='product-list-item'>
        <Close className='remove-wish' onClick={handleRemoveFromWishlist}/>
        <img src={`https://storage.cloud.google.com/zen-recovery-images/${product.picture}`} alt={product.name}  width="100px" height="100px"/>
        <p>{product.name}</p>
        <p>${product.price.toFixed(2)}</p>
        <div className='cart-buttons'>
            <button onClick={handleAddToCart}> Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductListItem
