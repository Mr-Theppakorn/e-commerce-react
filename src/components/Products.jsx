import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { getProductCount, getProductList } from '../api/product'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from './ProductItem'
import LoadingCard from './LoadingCard'
import BestSellers from './home/BestSellers';
import Pagination from '@mui/material/Pagination';
import CategoryList from './category/CategoryList';
import SubList from './sub/SubList';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, [page]);

    useEffect(() => {
        loadProductsCount();
    }, []);

    const loadProducts = () => {
        setLoading(true);
        getProductList("createdAt", "desc", page)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    const loadProductsCount = () => {
        getProductCount()
            .then((res) => {
                setProductsCount(res.data.length);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const renderProducts = products.map((item) => {
        return <ProductItem key={item._id} product={item} />
    })

    return (
        <Container className='mt-5'>
            <Typography className='text-center font-bold' variant="h4" color="initial">
                New Arrivals
            </Typography>
            <div className='divider'></div>
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

            <Pagination className='flex m-5 justify-center' count={Math.ceil(productsCount / 8)} page={page} onChange={handleChange} color="primary" />
            <div className='divider'></div>
            <Typography className='text-center mt-5 font-semibold' variant="h4" color="initial">
                CategoryList
            </Typography>
            <CategoryList />
            <div className='divider'></div>
            <Typography className='text-center mt-5 font-semibold' variant="h4" color="initial">
                SubsList
            </Typography>
            <SubList />
            <div className="divider"></div>
        </Container>
    );
}