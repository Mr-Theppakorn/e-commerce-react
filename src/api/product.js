import axios from 'axios';
const api = import.meta.env.VITE_REACT_APP_API

export const createProduct = async (authtoken, values) => {
    return await axios.post(`${api}/product`, values, {
        headers: {
            authtoken
        }
    });
}

export const getProductList = async (sort, order, page) => {
    return await axios.post(`${api}/products`, {
        sort,
        order,
        page,
    });
}

export const getProductByFilter = async (arg) => {
    return await axios.post(`${api}/search`, arg);
}

export const getProduct = async (_id) => {
    return await axios.get(`${api}/product/${_id}`);
}

export const getProductCount = async () => {
    return await axios.get(`${api}/products/total`);
}

export const getRelatedProduct = async (_id) => {
    return await axios.get(`${api}/product/related/${_id}`);
}

export const productRating = async (authtoken, star, comment, _id) => {
    return await axios.put(`${api}/product/star/${_id}`, { star, comment }, {
        headers: {
            authtoken
        }
    });
}

export const updatedProduct = async (authtoken, _id, values) => {
    return await axios.patch(`${api}/product/${_id}`, values, {
        headers: {
            authtoken
        }
    });
}

export const removeProduct = async (authtoken, _id) => {
    return await axios.delete(`${api}/product/${_id}`, {
        headers: {
            authtoken
        }
    });
}

export const uploadImages = async (authtoken, image) => {
    return await axios.post(`${api}/upload-images`, { image }, {
        headers: {
            authtoken
        }
    });
}

export const removeImages = async (authtoken, public_id, _id) => {
    return await axios.post(`${api}/remove-image`, { public_id, _id }, {
        headers: {
            authtoken
        }
    });
}

export const saveCart = async (cart, authtoken) => {
    return await axios.post(`${api}/cart`, { cart }, {
        headers: {
            authtoken
        }
    });
}

export const getCart = async (authtoken) => {
    return await axios.get(`${api}/cart`, {
        headers: {
            authtoken
        }
    });
}

export const removeCart = async (authtoken) => {
    return await axios.delete(`${api}/cart`, {
        headers: {
            authtoken
        }
    });
}

export const saveAddress = async (address, authtoken) => {
    return await axios.post(`${api}/address`, { address }, {
        headers: {
            authtoken
        }
    });
}

export const getUserOrder = async (authtoken) => {
    return await axios.get(`${api}/order`, {
        headers: {
            authtoken
        }
    });
}
