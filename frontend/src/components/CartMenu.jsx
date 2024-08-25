import React, { useState } from 'react';
import {  Menu, MenuItem, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import CartMenuItems from './CartMenuItems';
import { useSelector } from 'react-redux';
import StyledBadge from '@mui/material/Badge';

const CartMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const cart = useSelector(state => state.cart);

  return (
    <div>
            <IconButton aria-label="cart" onClick={handleClick}>
              <StyledBadge badgeContent={cart.totalQuantity} color="secondary">
               <ShoppingCart style={{color: 'black'}}/>
             </StyledBadge>
            </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
            <CartMenuItems />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CartMenu;