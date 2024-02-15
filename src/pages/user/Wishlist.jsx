import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from '../../components/ProductItem'
import { getWishlist } from '../../api/auth';
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const [wishlists, setWishlists] = useState([]);
    const { token } = useSelector(state => state.user)

    useEffect(() => {
        loadProducts();
    }, []);


    const loadProducts = () => getWishlist(token).then((res) => setWishlists(res.data.wishlist));

    const renderProducts = wishlists.map((item) => {
        return <ProductItem key={item._id} product={item} />
    })

    return (
        <Container className='mt-5 mb-80'>
            <Typography className='text-center mt-5' variant="h4" color="initial">
                My Wishlist
            </Typography>
            <div className='divider' />
            <Grid className='mt-5' container spacing={2}>
                {renderProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.key}>
                        {product}
                    </Grid>
                ))}

            </Grid>
        </Container>
    )
}

export default Wishlist;