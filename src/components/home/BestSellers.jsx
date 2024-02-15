import * as React from 'react';
import { getProductList } from '../../api/product'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from '../../components/ProductItem'
import LoadingCard from '../../components/LoadingCard'

export default function BestSellers() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoading(true);
        getProductList("sold", "desc", 3)
            .then((res) => {
                setProducts(res.data);
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
        <>


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
        </>
    );
}