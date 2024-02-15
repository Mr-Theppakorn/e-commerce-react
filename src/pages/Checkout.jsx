import React from 'react'
import { Container, Button, TextField } from '@mui/material'
import Textarea from '@mui/joy/Textarea';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, saveAddress } from '../api/product'
import { toast } from 'react-toastify';
import { applyCoupon } from '../api/coupon';
import { addCoupon } from '../store/slices/couponSlice';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentIntent } from '../api/stripe'


const Checkout = () => {
    const cartItems = useSelector((state) => state.cart);
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
    const [address, setAddress] = useState();
    const { token } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = cart;
    console.log(products);
    useEffect(() => {
        loadCart();
        if (cartItems.length === 0) {
            navigate('/')
        }
    }, []);


    const loadCart = () => {
        getCart(token)
            .then((res) => {
                setCart(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleAddress = () => {
        saveAddress(address, token)
            .then((res) => {
                if (res.data.ok) {
                    toast.success('Save Address Success!')
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const useCoupon = () => {
        applyCoupon(coupon, token)
            .then((res) => {
                if (res.data.ok) {
                    setTotalAfterDiscount(res.data.totalAfterDiscount);
                    dispatch(addCoupon({ coupon: true }));
                    toast.success('Apply Coupon Success!')
                }
                if (res.data.err) {
                    toast.error('Invalid Coupon!');
                }

            }).catch((err) => {
                console.log(err);
            });
    }

    const handlePayment = async () => {
        console.log(totalAfterDiscount);
        const stripe = await loadStripe("pk_test_51NrGyoEx1pbrXeqOHIUruAVgxAfR2EK0v3QHq2Ft2b5mWNxLpLuvJukNUrtcAP76yaB9t8uDl4dgbzfr912QyFzh00ZL7jWLIG");
        createPaymentIntent(totalAfterDiscount, products, coupon, token)
            .then((res) => {
                const session = res.data;
                console.log(res.data);
                const result = stripe.redirectToCheckout({
                    sessionId: session.id
                })
                if (result.error) {
                    toast.error(result.error.message);
                }

            }).catch((err) => {
                console.log(err);
            });
    }

    const handleCoupon = () => (
        <>
            <TextField
                color="primary"
                minRows={1}
                placeholder="Coupon"
                size="lg"
                onChange={(e) => setCoupon(e.target.value)}
                required
            />
            <div>
                <Button className='mt-2 w-24 hover:bg-sky-600 hover:text-white' variant="outlined" onClick={useCoupon}>
                    Apply
                </Button>
            </div>
        </>
    )


    return (
        <Container className='h-[100vh]'>
            <div className="flex flex-row mt-5">
                <div className='basis-10/12 ml-12 m-5'>
                    <h1 className='font-bold mb-2'>Delivery Address</h1>
                    <Textarea
                        color="primary"
                        minRows={2}
                        placeholder="Address"
                        size="lg"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button className='mt-2 w-24 hover:bg-sky-600 hover:text-white' variant="outlined" onClick={handleAddress}>
                        Save
                    </Button>
                    <hr className='my-5' />
                    <h1 className='font-bold mb-2'>Got Coupon?</h1>
                    {handleCoupon()}
                </div>
                <div className='basis-2/5  border border-base-300 p-5 mt-5 ml-1 rounded shadow-md'>
                    <h1 className='text-2xl font-bold text-center'>Order Summary</h1>
                    <hr className='mt-5' />
                    <p className='m-2 font-bold'>Products : {products?.length}</p>
                    <hr />
                    {products?.map(({ count, color, product: { _id, title, price } }) => (
                        <div className='my-2' key={_id}>
                            <p>{title} ({color}) x {count} =
                                {price * count}

                            </p>
                        </div>
                    ))}
                    <hr />
                    <p className='my-2'>Cart Total : {cart?.cartTotal}</p>
                    {totalAfterDiscount > 0 && (
                        <p className='bg-green-400 border-4 border-green-400'>Discount Applied : Total Payable : ${totalAfterDiscount}</p>
                    )}
                    <div className='mt-5 text-center'>
                        <button className='btn btn-success' onClick={handlePayment}>
                            Checkout Payment
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Checkout;