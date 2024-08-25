import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Zen from '../assets/zentrans.png';
import styles from '../styles/NavBarStyle';
import { useNavigate } from 'react-router';
import { Favorite } from '@mui/icons-material';
import StyledBadge
  from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import CartMenu from './CartMenu';



function NavBar() {
  const navigate = useNavigate();


  const wishlist = useSelector((state) => state.wishlist);

  const handleHomeClick = () => {
    navigate('/');
  }
  const handleProductsClick = () => {
    navigate('/products');
  }
  const handleWishlistClick = () => {
    navigate('/wishlist');
  }
  const handleAboutClick = () => {
    navigate('/about');
  }
    return (
        <AppBar position="static" sx={styles.appbar}>
          <Toolbar sx={styles.toolbar}>
            <Box sx={styles.navButtons}>
              <Button color="inherit" onClick={handleHomeClick}>Home</Button>
              <Button color="inherit" onClick={handleProductsClick}>Products</Button>
              <Button color="inherit" onClick={handleAboutClick} >About</Button>
            </Box>
            <Typography variant="h6" component="div" sx={styles.logo}>
                <img src={Zen} alt="Zen" className="zen-logo" style={styles.logoImage}/>
            </Typography>
            <CartMenu />
            <IconButton edge="end" color="inherit" aria-label="wishlist" sx={styles.cartButton}>
            <StyledBadge badgeContent={wishlist.products.length} color="secondary">
              <Favorite  onClick={handleWishlistClick}/>
            </StyledBadge>
            </IconButton>
          </Toolbar>
        </AppBar>
      );
    };

export default NavBar
