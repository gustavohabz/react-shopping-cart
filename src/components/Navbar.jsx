import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setAddedToCart } from '../slices/cartItemSlice';
import { setCart } from '../slices/cartCounterSlice';

export const Navbar = () => {
    const cart = useSelector(state => state.cartItem.value)
    const cartCounter = useSelector(state => state.cartCounter.value)

    const dispatch = useDispatch();

    useEffect(() => {
        try{
            const cartItems = (JSON.parse(localStorage.getItem('cart-item')) ? JSON.parse(localStorage.getItem('cart-item')) : [])
            if(cartItems.length > 0){
                dispatch(setAddedToCart(cartItems))
            }
            const cartCount = (JSON.parse(localStorage.getItem('cart-count')) ? JSON.parse(localStorage.getItem('cart-count')) : [])
            dispatch(setCart(cartCount))
        }catch(e){
            console.log('Error')
        }
    }, [])

    useEffect(() => {
        dispatch(setCart(cartCounter))
    }, [cartCounter])

  return (
    <Box>
        <AppBar sx={{ bgcolor: '#ffc107', color: '#000000' }}>
            <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/home">
                    Faker's Shopping
                </Link>
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/shop">
                    <Button variant="contained">
                        <StorefrontIcon /> &nbsp; Products
                    </Button>
                </Link>
            </Typography>
            <IconButton color="inherit">
                <Badge badgeContent={cartCounter} color="primary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
