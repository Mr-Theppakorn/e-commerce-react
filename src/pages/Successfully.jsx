import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material'
import { Link } from 'react-router-dom';
import { removeFromCart } from '../store/slices/cartSlice';
import { removeCart } from '../api/product';

const Successfully = () => {
    const { token } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
            dispatch(removeFromCart({ payload: [] }));
            removeCart(token);
        }
    }, []);

    return (
        <Container className='h-[100vh] mt-20'>
            <div className='border border-base-300 p-10 mt-5 ml-1 rounded shadow-md flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold text-center'>Your Payment Has Been Successfully</h1>
                <hr className='mt-5' />
                <p className='text-xl font-semibold '>Thank you for shopping with us</p>
                <Link to='/' className='bg-green-600 hover:bg-green-500 text-white p-3 mt-5 ml-1 rounded shadow-md capitalize'>Continue Shopping</Link>
            </div>
        </Container>
    )
}

export default Successfully;