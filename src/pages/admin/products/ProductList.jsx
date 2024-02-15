import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { getProductList } from '../../../api/product'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';
import { removeProduct } from '../../../api/product';
import { useSelector } from 'react-redux'
import AdminLayout from '../../../components/layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const { token } = useSelector(state => state.user)
    const [products, setProducts] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {

        getProductList()
            .then((res) => {
                console.log(res.data);
                setProducts(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    const onDeleteProduct = (_id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            removeProduct(token, _id)
                .then((res) => {
                    const filteredProducts = products.filter(p => {
                        return p._id !== _id;
                    })
                    setProducts(filteredProducts);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    const renderProducts = products.map((item) => {
        return <ProductCard key={item._id} product={item} onDeleteProduct={onDeleteProduct} />
    })

    return (
        <AdminLayout>
            <Container className='mt-5'>
                <div className='flex justify-between'>
                    <Typography className='text-center' variant="h4" color="initial">
                        All Products
                    </Typography>
                    <button className='btn btn-primary' onClick={() => navigate('/admin/product/create')}>Add Product</button>
                </div>
                <div className='divider'></div>
                <Grid className='mt-5' container spacing={2}>
                    {renderProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.key}>
                            {product}
                        </Grid>
                    ))}
                </Grid>
                <div className="divider"></div>
            </Container>
        </AdminLayout>
    );
}