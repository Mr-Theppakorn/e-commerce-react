import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getSub } from '../../api/category';
import { Link } from 'react-router-dom';

export default function SubList() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSubs();
    }, []);

    const loadSubs = () => {
        setLoading(true);
        getSub()
            .then((res) => {
                setSubs(res.data);
                setLoading(false);

            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    return (
        <>
            {loading &&
                <div>Loading...</div>
            }
            <Grid className='mt-5' container>
                {subs.map((s) => (
                    <Grid className='bg-gray-100 m-1 p-2 text-center cursor-pointer rounded-md shadow-sm hover:shadow-md hover:bg-gray-200' item xs={12} sm={6} md={4} lg={2} key={s._id}>
                        <Link className='text-black' underline="none" to={`/subs/${s.slug}`}>{s.name}</Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}