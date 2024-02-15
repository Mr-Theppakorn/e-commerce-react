import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'));
    } else {
        initialState = [];
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            return action.payload;
        },
        removeFromCart: (state, action) => {
            return []
        },

    }

});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;