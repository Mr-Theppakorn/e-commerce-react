import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from '../../components/ProductItem'
import LoadingCard from '../../components/LoadingCard'
import { useParams } from 'react-router-dom';
import { getCategoryOne, getProductBySub } from '../../api/category';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';

export default function SubPage() {
    const { slug } = useParams();
    const [sub, setSub] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoading(true);
        getProductBySub(slug)
            .then((res) => {
                setSub(res.data.sub);
                console.log(res.data);
                setProducts(res.data.products);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    const renderProducts = products.map((item) => {
        return <ProductItem key={item._id} product={item} />
    })

    return (
        <Container className='mt-5 mb-80'>
            <Typography className='text-center' variant="h4" color="initial">
                {sub?.name}
            </Typography>
            <div className='divider' />
            {loading &&
                <LoadingCard count={products.length} />
            }
            <Grid className='mt-5' container spacing={2}>
                {renderProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.key}>
                        {product}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}