import React from 'react'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getUserOrder } from '../../api/product';
import Typography from '@mui/material/Typography'

const History = () => {
    const { token } = useSelector(state => state.user)
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = () => {

        getUserOrder(token)
            .then((res) => {
                setOrders(res.data)
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }


    const tableOrder = (order) => (
        <table className="mt-5 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Quantity
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.products.map(({ product, color, count }) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xs">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {product.title}
                        </th>
                        <td className="px-6 py-4">
                            {color}
                        </td>
                        <td className="px-6 py-4">
                            {product.brand}
                        </td>
                        <td className="px-6 py-4">
                            {product.price}
                        </td>
                        <td className="px-6 py-4">
                            {count}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

    const showOrder = () => (
        orders.map((order, i) => (
            <div key={i} className='overflow-x-auto m-5 p-5 bg-slate-200 rounded'>
                {tableOrder(order)}
                <div>
                    <p className='text-center mt-5 text-sm'>ID : {order.paymentIntent
                        .id}</p>
                </div>
            </div>
        ))
    )

    return (
        <Container className='mt-5 mb-80'>
            <Typography className='text-center mt-5' variant="h4" color="initial">
                {orders.length > 0 ? "Order History" : "No Purchase Order!"}
            </Typography>
            <div className='divider' />
            {showOrder()}
        </Container>
    )
}

export default History;