import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, TextField } from '@mui/material'
import './../assets/shop.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductService from '../services/ProductService'
import { useDispatch } from 'react-redux'
import { setCart } from '../slices/cartCounterSlice';
import { setAddedToCart } from '../slices/cartItemSlice';
import { v4 as uuidv4 } from 'uuid'
import { ProductCard } from '../components/ProductCard';

export const Shop = () => {
  const [shopItems, setShopItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const items = await ProductService.fetchStoreItems()
      handlecartItems(items)
      setShopItems(items)
    } catch(e) {
      console.log('Error')
      console.log(e)
    }
  }

  const fetchCartItemsFromLocalStorage = () => {
    try {
      return (JSON.parse(localStorage.getItem('cart-item')) ? JSON.parse(localStorage.getItem('cart-item')) : [])
    }catch(e){
      return []
    }
  }

  const validateAmmountToLoad = (id) => {
    const cartItemsLocalStorage = fetchCartItemsFromLocalStorage()
    let ammount = 0
    if(cartItemsLocalStorage.length > 0){
      for(let i=0; i<cartItemsLocalStorage.length; i++){
        const item = cartItemsLocalStorage[i]
        if(item.id === id){
          ammount = item.ammount
          break
        }
      }
    }
    return ammount
  }

  const handlecartItems = (items) => {
    const tempcartItems = []
    items.forEach((item) => {
      const obj = {
        id: item.id, 
        ammount: validateAmmountToLoad(item.id), 
        title: item.title, 
        image: item.image,
        price: item.price,
        category: item.category
      }
      tempcartItems.push(obj)
    })
    setCartItems(tempcartItems)
  }

  const fetchCountFromLocalStorage = () => {
    return (localStorage.getItem('cart-count') ? localStorage.getItem('cart-count') : 0)
  }

  const setCountFromLocalStorage = () => {
    let counterStorage = fetchCountFromLocalStorage()
    dispatch(setCart(counterStorage))
  }

  const updateCount = () => {
    let counter = 0
    if(cartItems.length > 0){
      cartItems.forEach((cart) => {
        counter += cart.ammount
      })
    }
    (counter == 0 ? dispatch(setCart(0)) : dispatch(setCart(counter)))
  }

  const updateCartItems = (ammount, id) => {
    let ammountToSend = 0
    if(isNaN(parseInt(ammount))) ammountToSend = 0
    if(!isNaN(parseInt(ammount))) ammountToSend = parseInt(ammount, 10)
    const nextCarts = cartItems.map((cart) => {
      if(cart.id === id){
        return {...cart, ammount: ammountToSend, cartId: uuidv4()}
      }else{
        return cart;
      }
    })
    setCartItems(nextCarts)
    if(cartItems.length > 0){
      validateCartAmmount()
    }
  }

  const addCartItems = (item) => {
    let ammount
    cartItems.forEach((cart) => {
      if(cart.id === item.id){
        ammount = cart.ammount + 1
      }
    })
    updateCartItems(ammount, item.id)
  }

  const removeCartItems = (id) => {
    let ammount
    cartItems.forEach((cart) => {
      if(cart.id === id){
        ammount = (cart.ammount > 0 ? cart.ammount - 1 : cart.ammount)
      }
    })
    updateCartItems(ammount, id)
  }

  const validateCartAmmount = () => {
    let arr = []
    cartItems.forEach((item) => {
      if(item.ammount > 0){
        arr.push(item)
      }
    })
    dispatch(setAddedToCart(arr))
  }

  useEffect(() => {
    fetchData()
    setCountFromLocalStorage()
  }, [])

  useEffect(() => {
    updateCount()
    if(cartItems.length > 0){
      validateCartAmmount()
    }
  }, [cartItems])

  return (
    <>
      <Box align="center">
          <div className="shop-title-spacing">
              <h1>Our Products</h1>
          </div>
      </Box>
      <Container maxWidth="xl">
        <Grid
          justifyContent="center" 
          container 
          spacing={3} 
        >
          {shopItems.map((item, index) => (
            <ProductCard 
              key={item.id}
              product={item}
              removeCartItems={removeCartItems}
              addCartItems={addCartItems}
              updateCartItems={updateCartItems}
              inputValue={cartItems[index]}
            />
          ))}
        </Grid>
      </Container>
    </>
  )
}
