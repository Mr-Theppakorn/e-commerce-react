import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, createPaymentIntent } from '../../api/stripe'
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';
import { removeCart } from '../../api/product';
import { useNavigate } from 'react-router-dom';

const cartStyle = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const StripeCheckout = () => {
    const { token } = useSelector(state => (state.user))
    const { coupon } = useSelector(state => (state.coupon))
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret] = useState();
    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(coupon, token)
            .then((res) => {
                setClientSecret(res.data.clientSecret);
                setCartTotal(res.data.cartTotal);
                console.log(res.data);
                setTotalAfterDiscount(res.data.totalAfterDiscount);
                setPayable(res.data.payable);
            })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(clientSecret);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            }
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`)
        } else {
            createOrder(payload, token).then((res) => {
                if (res.data.ok) {
                    if (typeof window !== 'undefined') localStorage.removeItem('cart');
                    dispatch(removeFromCart({ payload: [] }));
                    removeCart(token);
                    navigate('/user/history')
                }
            }).catch((err) => {
                console.log(err);
            });
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <>
            <div className='my-5 mx-auto w-96 border border-base-300 p-5 shadow-md'>
                <h1 className='text-center text-3xl font-bold'>Complete Your Purchase</h1>
                <p className='text-center  font-bold'>Total : {cartTotal}</p>
                <p className='text-center font-bold'>Total payable : {totalAfterDiscount ? totalAfterDiscount : cartTotal}</p>
            </div>
            <p className={succeeded ? 'result-message' : 'result-message hidden'}>Payment Successfully</p>
            <form id='payment' className='stripe-form' onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
                <button className='stripe-button'
                    disabled={processing || disabled || succeeded}
                >
                    <span id='button-text'>{processing ? <div className='spinner'></div> : "Pay"}</span>
                </button>
            </form>

            {error && <div className='card-error'>{error}</div>}
        </>
    )
}

export default StripeCheckout;