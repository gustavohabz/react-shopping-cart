import { createSlice } from '@reduxjs/toolkit'

export const cartCounterSlice = createSlice({
    name: 'cartCounter',
    initialState: {
        value: 0
    },
    reducers: {
        setCart: (state, action) => {
            state.value = action.payload
            localStorage.setItem('cart-count', action.payload)
        }
    }
})

export const { setCart } = cartCounterSlice.actions

export default cartCounterSlice.reducer