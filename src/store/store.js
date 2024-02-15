import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { cartReducer } from './slices/cartSlice';
import { addUser, userLogout, updateImage } from './slices/userSlice'
import { addToCart, removeFromCart } from './slices/cartSlice'
import { searchQuery } from './slices/searchSlice'
import { searchReducer } from './slices/searchSlice';
import { couponReducer, addCoupon } from './slices/couponSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        cart: cartReducer,
        coupon: couponReducer,
        devTools: true
    },
});

export { addUser, store, userLogout, searchQuery, updateImage, addToCart, addCoupon, removeFromCart };

