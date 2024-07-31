import { createSlice } from '@reduxjs/toolkit'

export const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState: {
        value: []
    },
    reducers: {
        setAddedToCart: (state, action) => {
            state.value = action.payload
            localStorage.setItem('cart-item', JSON.stringify(action.payload))
        }
    }
})

export const { setAddedToCart } = cartItemSlice.actions

export default cartItemSlice.reducer