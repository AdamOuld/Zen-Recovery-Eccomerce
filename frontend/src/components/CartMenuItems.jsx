import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { Close } from '@mui/icons-material';

const CartMenuItems = () => {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckout = () => {
    navigate('/checkout');
  }

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    console.log(cart.totalQuantity);
  }


  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <div >
      <List>
        {cart.items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`Price: $${item.price}   Quantity: ${item.quantity}`} />
            <Close style={{marginLeft: '10px'}} onClick={() => {handleRemove(item.id)}}/>
          </ListItem>
        ))}
      </List>
      <h2>Total: ${cart.totalPrice}</h2>
      <div className='cart-buttons'>
      <Button variant="contained" style={{background: '#c2fbd7', borderRadius:'25px', color:'green'}} onClick={handleCheckout}>Checkout</Button>
      <Button variant="contained" style={{background: '#c2fbd7', borderRadius:'25px', color:'green'}} onClick={handleClearCart}>Clear Cart</Button>
      </div>
    </div>
  );
};

export default CartMenuItems;