import { configureStore } from '@reduxjs/toolkit'
import cartCounterReducer from './slices/cartCounterSlice'
import cartItemSlice from './slices/cartItemSlice'

export default configureStore({
    reducer: {
        cartCounter: cartCounterReducer,
        cartItem: cartItemSlice
    }
})