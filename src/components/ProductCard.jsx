import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, TextField, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import React from 'react'
import { Link } from 'react-router-dom';

export const ProductCard = ({product, inputValue, removeCartItems, addCartItems, updateCartItems}) => {
    const handleFocus = (event) => {
        event.target.select()
    }
    const formatPrice = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(val)
    }
  return (
    <Grid item lg={3} md={4} xs={6} sm={6}>
        <Card variant="outlined">
            <CardMedia
                component="img" 
                alt="some image"
                sx={{ height: '150px', padding: '1em 0em 1em', objectFit: 'contain' }}
                image={product.image}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {product.title}
                </Typography>
                <Typography variant="subtitle1">
                    {formatPrice(product.price)}
                </Typography>
            </CardContent>
            <CardActions style={{alignItems: 'center'}}>
                <IconButton
                    onClick={() => removeCartItems(product.id)}
                    >
                    <RemoveShoppingCartIcon />
                </IconButton>
                <TextField
                    sx={{width: '20%'}}
                    onFocus={handleFocus}
                    maxLength="2"
                    variant="standard"
                    value={inputValue.ammount}
                    onChange={(e) => updateCartItems(e.target.value, product.id)}
                />
                <IconButton 
                    color="primary"
                    onClick={() => addCartItems(product)}
                >
                    <AddShoppingCartIcon />
                </IconButton>
                {inputValue.ammount > 0 && (
                    <Link to="/checkout">
                        <Button 
                            variant="contained"
                        >
                            Checkout
                        </Button>
                    </Link>
                )}
            </CardActions>
        </Card>
    </Grid>
  )
}
