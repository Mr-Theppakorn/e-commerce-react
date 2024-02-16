import axios from 'axios';
const api = import.meta.env.VITE_REACT_APP_API

export const createUser = async (token) => {
    return await axios.post(`${api}/create-user`, {}, {
        headers: {
            authtoken: token
        }
    });
}

export const updateUser = async (token, text) => {
    return await axios.patch(`${api}/update-user`, { text }, {
        headers: {
            authtoken: token
        }
    });
}


export const getCurrentUser = async (token) => {
    return await axios.post(`${api}/get-user`, {}, {
        headers: {
            authtoken: token
        }
    });
}

export const getAllUsers = async (token) => {
    return await axios.get(`${api}/users`, {
        headers: {
            authtoken: token
        }
    });
}

export const getOrder = async (token) => {
    return await axios.get(`${api}/admin/orders`, {
        headers: {
            authtoken: token
        }
    });
}

export const changeOrderStatus = async (orderId, orderStatus, token) => {
    return await axios.put(`${api}/admin/orders`, { orderId, orderStatus }, {
        headers: {
            authtoken: token
        }
    });
}

export const addWishlist = async (productId, token) => {
    return await axios.post(`${api}/wishlist`, { productId }, {
        headers: {
            authtoken: token
        }
    });
}

export const getWishlist = async (token) => {
    return await axios.get(`${api}/wishlist`, {
        headers: {
            authtoken: token
        }
    });
}

export const removeWishlist = async (productId, token) => {
    return await axios.put(`${api}/wishlist`, { productId }, {
        headers: {
            authtoken: token
        }
    });
}

export const changeImage = async (token, image, public_id) => {
    return await axios.post(`${api}/user/profile/image`, { image, public_id }, {
        headers: {
            authtoken: token
        }
    });
}