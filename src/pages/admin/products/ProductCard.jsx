import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onDeleteProduct }) {
    const { title, description, images, _id } = product;

    return (
        <Card sx={{ maxWidth: 400, maxHeight: 400 }}>
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

            </CardContent>
            <hr />
            <CardActions>
                <Button className='bg-green-600' variant='contained' size="small">
                    <Link className='text-white' underline='none' to={`/user/Product/edit/${_id}`}>Edit</Link>
                </Button>
                <Button className='bg-red-600' variant='contained' size="small"
                    onClick={() => onDeleteProduct(_id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card >
    );
}