import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        coupon: false
    },
    reducers: {
        addCoupon: (state, action) => {
            return action.payload;
        },


    }

});

export const { addCoupon } = couponSlice.actions;
export const couponReducer = couponSlice.reducer;