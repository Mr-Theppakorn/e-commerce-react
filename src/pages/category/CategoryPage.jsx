import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from '../../components/ProductItem'
import LoadingCard from '../../components/LoadingCard'
import { useParams } from 'react-router-dom';
import { getCategoryOne } from '../../api/category';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';

export default function CategoryPage() {
    const { slug } = useParams();
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoading(true);
        getCategoryOne(slug)
            .then((res) => {
                setCategory(res.data.category);
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
                {category?.name}
            </Typography>

            {loading &&
                <LoadingCard count={products.length} />
            }
            {products ? <Grid className='mt-5' container spacing={2}>
                {renderProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.key}>
                        {product}
                    </Grid>
                ))}
            </Grid> : <div>No Product</div>}
        </Container>
    );
}