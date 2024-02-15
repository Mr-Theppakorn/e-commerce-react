import axios from 'axios';
const api = import.meta.env.VITE_REACT_APP_API

export const createCoupon = async (coupon, authtoken) => {

    return await axios.post(`${api}/coupon`, coupon, {
        headers: {
            authtoken
        }
    });
}

export const applyCoupon = async (coupon, authtoken) => {
    return await axios.post(`${api}/cart/coupon`, { coupon }, {
        headers: {
            authtoken
        }
    });
}

export const getCoupon = async () => {
    return await axios.get(`${api}/coupon`);
}

export const removeCoupon = async (couponId, authtoken) => {
    return await axios.delete(`${api}/coupon/${couponId}`, {
        headers: {
            authtoken
        }
    });
}