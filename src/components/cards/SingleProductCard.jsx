import React from 'react'
import _ from 'lodash'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { productRating } from '../../api/product';
import RatingAverage from './RatingAverage';
import { addWishlist, getWishlist, removeWishlist } from '../../api/auth';
import { addToCart } from '../../store/slices/cartSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SingleProductCard = ({ product, loadProduct }) => {
    const { title, description, category, subs, shipping, images, color, brand, sold, quantity, price, _id } = product;
    const { token, id } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [star, setStar] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const [wishlist, setWishlist] = React.useState([]);

    useEffect(() => {
        if (product.ratings && id) {
            let existingRating = product.ratings.find((i) => i.postedBy.toString() === id.toString());
            existingRating && setStar(existingRating.star), setComment(existingRating?.comment);
        }
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        if (!token) return;
        getWishlist(token).then((res) => setWishlist(res.data.wishlist.filter(i => i._id === _id)))
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            dispatch(addToCart(unique));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        productRating(token, star, comment, _id)
            .then((res) => {
                loadProduct();
            }).catch((err) => {
                console.log(err);
            })
        handleClose();
    };

    const handleWishlist = () => {
        addWishlist(_id, token)
            .then((res) => {
                loadWishlist();
            }).catch((err) => {
                console.log();
            });
    };

    const handleWishlistRemove = () => {
        removeWishlist(_id, token)
            .then((res) => {
                loadWishlist();
                console.log(res.data);
            }).catch((err) => {
                console.log(err.message);
            });
    };

    const findWishlist = wishlist.filter(i => i._id === _id);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className="col-span-1">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((image) => (
                        <img key={image.url} src={image.url} alt="Product Image" />
                    ))}

                </Carousel>
            </div>

            <div className="col-span-1">
                <Card>
                    <CardContent>
                        <Typography className="text-center" component="div" variant="h4">
                            {title}
                            <RatingAverage p={product} />
                        </Typography>
                    </CardContent>
                </Card>

                <Card className="mt-3">
                    <CardContent>
                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Price</div>
                            <div>{price}$</div>
                        </Typography>
                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Category</div>
                            <div>{category.name}</div>
                        </Typography>

                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Sub Category</div>
                            <div>{subs.map((sub) => <div key={sub.name}>{sub.name}</div>)}</div>
                        </Typography>

                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Shipping</div>
                            <div>{shipping}</div>
                        </Typography>

                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Color</div>
                            <div>{color}</div>
                        </Typography>

                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Brand</div>
                            <div>{brand}</div>
                        </Typography>

                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Quantity</div>
                            <div>{quantity}</div>
                        </Typography>

                        <Typography className="flex justify-between p-1" variant="body2">
                            <div>Sold</div>
                            <div>{sold}</div>
                        </Typography>
                    </CardContent>
                    <CardActions className='border justify-around'>
                        <Button className='font-bold capitalize' size="small" color='primary' onClick={handleAddToCart}>Add To Cart</Button>
                        {findWishlist !== null && token && (
                            findWishlist.length < 1 ? (
                                <Button className='font-bold capitalize' size="small" onClick={handleWishlist}>Add To Wishlist</Button>
                            ) : (
                                <Button className='font-bold capitalize' size="small" onClick={handleWishlistRemove}>Remove Wishlist</Button>
                            )
                        )}
                        {token && <Button className='font-bold capitalize' size="small" onClick={handleOpen}>Leave a rating</Button>}
                    </CardActions>
                </Card>

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" align='center' component="h2">
                        How would you rate this course?
                    </Typography>
                    <Typography id="modal-modal-title" variant="h7" align='center' sx={{ m: 2 }} component="h3">
                        <h2>Select Rating</h2>
                        <Rating
                            sx={{ m: 1 }}
                            name="simple-controller"
                            size="large"
                            value={star}
                            onChange={(event, newValue) => {
                                setStar(newValue);
                            }}
                        />
                    </Typography>
                    <TextField
                        id="filled-multiline-flexible"
                        fullWidth
                        label="Comment"
                        multiline
                        maxRows={6}
                        value={comment}
                        variant="outlined"
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                    <Typography align='center'>
                        <Button sx={{ m: 2 }} className='mt-10' variant="contained" type='submit'>
                            Save
                        </Button>

                    </Typography>
                </Box>
            </Modal >
        </>

    )
}

export default SingleProductCard;