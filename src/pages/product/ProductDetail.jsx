import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, TextField, OutlinedInput, Stack, FormControl, Select, MenuItem, Button, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getProduct, getRelatedProduct } from '../../api/product';
import SingleProductCard from '../../components/cards/SingleProductCard';
import TabsCard from '../../components/cards/TabsCard';
import ProductItem from '../../components/ProductItem';
import Grid from '@mui/material/Grid';

function ProductDetail() {
    const { _id } = useParams();
    const [values, setValues] = useState();
    const [products, setProducts] = useState([]);


    useEffect(() => {
        loadProduct();
    }, [_id]);

    const loadProduct = () => {
        getProduct(_id)
            .then((res) => {
                setValues(res.data)
                getRelatedProduct(res.data._id).then((res) => setProducts(res.data));
            }).catch((err) => {
                console.log(err);
            })
    }

    const renderProducts = products.map((item) => {
        return <ProductItem key={item._id} product={item} />
    })

    return (
        <Container className='mt-10'>
            <div className="md:grid grid-cols-2 grid-flow-col gap-4">
                {values && <SingleProductCard product={values} loadProduct={loadProduct} />}
            </div>
            {values && <TabsCard values={values} />}

            <hr className='m-5' />

            <Typography className="text-center" component="div" variant="h5">
                Related Products
            </Typography>
            <Grid className='mt-5 mb-5' container spacing={2}>
                {products.length ? renderProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.key}>
                        {product}
                    </Grid>
                )) : null}

            </Grid>

            <hr className='m-5' />
        </Container>
    )
}

export default ProductDetail