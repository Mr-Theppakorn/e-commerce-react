import axios from 'axios';
const api = import.meta.env.VITE_REACT_APP_API

export const createPaymentIntent = async (products, coupon, authtoken) => {
    return await axios.post(`${api}/payment`, { products, couponApplied: coupon }, {
        headers: {
            authtoken
        }
    });
}

export const createOrder = async (stripeResponse, authtoken) => {
    return await axios.post(`${api}/order`, { stripeResponse }, {
        headers: {
            authtoken
        }
    });
}