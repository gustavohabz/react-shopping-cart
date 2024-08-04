import { Avatar, Box, Button, Card, CardContent, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { setAddedToCart } from '../slices/cartItemSlice';
import { setCart } from '../slices/cartCounterSlice';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export const Checkout = () => {
  const [cartItems, setCartItems] = useState([])
  const [counter, setCounter] = useState(-1)
  const [boughtProduct, setBoughtProduct] = useState(false)
  const cartCounter = useSelector(state => state.cartCounter.value)

  const dispatch = useDispatch()

  const fetchCartFromStorage = () => {
    try {
      setCartItems(JSON.parse(localStorage.getItem('cart-item')))
    } catch(e) {
      console.log('Error')
    }
  }

  const addToCart = (id) => {
    const arr = []
    cartItems.forEach((item)=>{
      if(item.id === id){
        arr.push({...item, ammount: item.ammount+1})
      }else{
        arr.push(item)
      }
    })
    setCartItems(arr)
    dispatch(setAddedToCart(arr))
    setCounter(cartCounter+1)
  }

  const removeFromCart = (id) => {
    const arr = []
    cartItems.forEach((item)=>{
      if(item.id === id){
        arr.push({...item, ammount: item.ammount-1})
      }else{
        arr.push(item)
      }
    })

    setCounter(cartCounter-1)
    if(cartCounter > 0){
      setCartItems(arr)
      dispatch(setAddedToCart(arr))
    }else{
      setCartItems([])
      dispatch(setAddedToCart([]))
    }
  }
  
  const buyProducts = () => {
    setCounter(0)
    setBoughtProduct(true)
    dispatch(setAddedToCart([]))
    dispatch(setCart(0))
  }

  useEffect(() => {
    fetchCartFromStorage()
  }, [])

  useEffect(() => {
    if(counter > -1){
      dispatch(setCart(counter))
    }
  }, [counter])

  useEffect(() => {
    if(cartCounter == 0)setCartItems([])
  }, [cartCounter])

  return (
    <Box align="center">
        <div className="shop-title-spacing">
            <h1>Checkout</h1>
        </div>
        <Grid
          justifyContent="center" 
          container 
          spacing={3} 
        >
          <Grid item lg={8} md={8} xs={12} sm={12}>
            <Card>
              <CardContent>
                {boughtProduct ? (
                  <p>Purchase complete</p>
                ) : (
                  <List>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        (item.ammount > 0 && (
                          <ListItem 
                            key={item.id}
                            secondaryAction={
                              <>
                                <IconButton onClick={() => removeFromCart(item.id)}>
                                  <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={() => addToCart(item.id)}>
                                  <AddIcon />
                                </IconButton>
                              </>
                            }
                          >
                            <ListItemText>
                              <Typography variant="h6">
                                <Avatar 
                                  alt={item.title}
                                  sx={{width: 90, height: 90}}
                                  src={item.image}
                                />
                                {item.title} ({item.ammount})
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        ))
                      ))
                    ) : (
                      <p>Your cart is empty</p>
                    )}
                    {cartItems.length > 0 && (
                    <ListItem >
                      <Button onClick={buyProducts} size="large" variant="contained" color="success" sx={{marginLeft: 'auto'}}>
                        BUY &nbsp;
                        <ShoppingBasketIcon />
                      </Button>
                    </ListItem>
                    )}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Box>
  )
}
