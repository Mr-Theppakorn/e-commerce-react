import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import '../stripe.css'
import StripeCheckout from '../components/cards/StripeCheckout'
import { useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_STRIPE_API_SECRET

const promise = loadStripe(api);

const Payment = () => {
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
    })
    return (
        <Container>
            <Elements stripe={promise}>
                <StripeCheckout />
            </Elements>
        </Container>
    )
}

export default Payment;