import axios from 'axios';
const api = import.meta.env.VITE_REACT_APP_API

export const getCategory = async () => {
    return await axios.get(`${api}/category`);
}

export const getCategoryOne = async (slug) => {
    return await axios.get(`${api}/category/${slug}`);
}

export const getCategorySub = async (_id) => {
    return await axios.get(`${api}/category/subs/${_id}`);
}

export const updateCategory = async (authtoken, _id, name) => {
    return await axios.patch(`${api}/category`, { _id, name }, {
        headers: {
            authtoken
        }
    });
}

export const removeCategory = async (authtoken, slug) => {
    return await axios.delete(`${api}/category/${slug}`, {
        headers: {
            authtoken
        }
    });
}

export const createCategory = async (authtoken, category) => {
    return await axios.post(`${api}/category`, { category }, {
        headers: {
            authtoken
        }
    });
}

// Sub

export const getSub = async () => {
    return await axios.get(`${api}/sub`);
}

export const getSubOne = async (slug) => {
    return await axios.get(`${api}/sub/${slug}`);
}

export const getProductBySub = async (slug) => {
    return await axios.get(`${api}/sub/${slug}`);
}

export const updateSub = async (authtoken, _id, name) => {
    return await axios.patch(`${api}/sub`, { _id, name }, {
        headers: {
            authtoken
        }
    });
}

export const removeSub = async (authtoken, slug) => {
    return await axios.delete(`${api}/sub/${slug}`, {
        headers: {
            authtoken
        }
    });
}

export const createSub = async (authtoken, sub) => {
    return await axios.post(`${api}/sub`, sub, {
        headers: {
            authtoken
        }
    });
}

