import axios from 'axios';
const api = import.meta.env.VITE_REACT_APP_API

export const createPaymentIntent = async (products, authtoken) => {
    return await axios.post(`${api}/payment`, { products }, {
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
