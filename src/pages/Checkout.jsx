import { Avatar, Box, Card, CardContent, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { setAddedToCart } from '../slices/cartItemSlice';

export const Checkout = () => {
  const [cartItems, setCartItems] = useState([])
  
  const dispatch = useDispatch()

  const fetchCartFromStorage = () => {
    try {
      setCartItems(JSON.parse(localStorage.getItem('cart-item')))
    } catch(e) {
      console.log('Error')
    }
  }

  const updateLocalStorage = (arr) => {
    localStorage.setItem('cart-item', JSON.stringify(arr))
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
    updateLocalStorage(arr)
    setCartItems(arr)
    dispatch(setAddedToCart(arr))
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
    updateLocalStorage(arr)
    setCartItems(arr)
    dispatch(setAddedToCart(arr))
  }
  
  useEffect(() => {
    fetchCartFromStorage()
  }, [])

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
                <List>
                  {cartItems.map((item) => (
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
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Box>
  )
}
