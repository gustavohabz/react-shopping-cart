import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, TextField, Typography } from '@mui/material'
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
    <Card 
        variant="outlined"
        className="product-card"
        sx={{position: 'relative', marginBottom: '2%', boxShadow: 10, borderRadius: '5%'}}
    >
        <CardMedia
            component="img" 
            alt="some image"
            sx={{ height: '150px', padding: '1em 0em 1em', objectFit: 'contain' }}
            image={product.image}
        />
        <CardContent
            style={{paddingBottom: '40%'}}
        >
            <Typography variant="h6" gutterBottom>
                {product.title}
            </Typography>
            <Typography variant="subtitle1">
                {formatPrice(product.price)}
            </Typography>
        </CardContent>
        <CardActions style={{position: 'absolute', bottom: '0', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            <IconButton
                onClick={() => removeCartItems(product.id)}
            >
                <RemoveShoppingCartIcon />
            </IconButton>
            <TextField
                sx={{width: '60%'}}
                className="product-input"
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
            <div style={{width: '90%'}}>
                {inputValue.ammount > 0 ? (
                    <Link to="/checkout">
                        <Button 
                            variant="contained"
                            fullWidth
                        >
                            Checkout
                        </Button>
                    </Link>
                ) : (
                    <div style={{paddingTop: '20%'}}></div>
                )}
            </div>
        </CardActions>
    </Card>
  )
}
