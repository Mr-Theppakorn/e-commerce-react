import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import _ from 'lodash'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductItem({ product }) {
    const { title, description, images, _id, price } = product;
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const [tooltip, setTooltip] = useState('Click to add');

    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            const existingProductIndex = cart.findIndex((p) => p._id === _id);
            if (existingProductIndex === -1) {
                cart.push({ ...product, count: 1 });
            } else {
                cart[existingProductIndex].count = cart[existingProductIndex].count + 1;
            }
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem('cart', JSON.stringify(unique));
            setTooltip('Added');
            dispatch(addToCart(unique));
        }
    }

    return (
        <Card sx={{ maxWidth: 400, maxHeight: 400 }} className='shadow-lg hover:shadow-2xl rounded-xl hover:bg-gray-50'>
            <CardMedia
                className='object-cover'
                sx={{ height: 180 }}
                image={images[0]?.url}
                title="green"
            />
            <CardContent>
                <Typography gutterBottom variant="h7" component="div">
                    {title}
                </Typography>
                <Typography className='truncate' variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <span>${price}</span>
            </CardContent>
            <hr />
            <CardActions>
                <Button className='bg-green-600' variant='contained' size="small">
                    <Link className='text-white' underline='none' to={`/products/${_id}`}>View More</Link>
                </Button>
                <Tooltip title={tooltip}>
                    <Button className='bg-yellow-600' variant='contained' size="small"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </Tooltip>
            </CardActions>
        </Card >
    );
}