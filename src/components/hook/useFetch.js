import { useState, useEffect } from 'react'
import axios from 'axios'

const api = 'http://localhost:5000/api/'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${api}/${url}`);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${api}/${url}`);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch }
};

export default useFetch;

