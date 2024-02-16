import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import LoadingCard from '../../components/LoadingCard'
import { getCategory } from '../../api/category';
import { Link } from 'react-router-dom';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        setLoading(true);
        getCategory()
            .then((res) => {
                setCategories(res.data);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    return (
        <>
            {loading &&
                <LoadingCard count={categories.length} />
            }
            <Grid className='mt-5' container>
                {categories.map((c) => (
                    <Grid className='bg-gray-100 m-1 p-2 text-center cursor-pointer rounded-md shadow-sm hover:shadow-md hover:bg-gray-200' item xs={12} sm={6} md={4} lg={2} key={c._id}>
                        <Link className='text-black' underline="none" to={`/category/${c.slug}`}>{c.name}</Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}