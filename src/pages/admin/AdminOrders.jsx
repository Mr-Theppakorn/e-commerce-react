import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container'
import { getOrder, changeOrderStatus } from '../../api/auth';
import Orders from '../../components/order/Orders';
import Typography from '@mui/material/Typography'
import AdminLayout from '../../components/layout/AdminLayout';

const AdminOrders = () => {
    const { token } = useSelector(state => state.user)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        getOrder(token)
            .then((res) => {
                setOrders(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleStatus = (orderId, orderStatus) => {
        changeOrderStatus(orderId, orderStatus, token)
            .then((res) => {
                loadOrders();
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <AdminLayout>
            <Container className='h-screen'>
                <Typography className='text-center mt-5' variant="h4" color="initial">Admin Order Management</Typography>
                <Orders orders={orders} handleStatus={handleStatus} />
            </Container>
        </AdminLayout>
    )
}

export default AdminOrders;