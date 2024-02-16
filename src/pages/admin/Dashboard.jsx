import React from 'react'
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout'
import InventoryIcon from '@mui/icons-material/Inventory';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { getProductList } from '../../api/product';
import { getAllUsers, getOrder } from '../../api/auth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
const Dashboard = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
        loadOrders();
        loadUsers();
    }, []);


    const loadProducts = () => {
        setLoading(true);
        getProductList()
            .then((res) => {
                setProducts(res.data);
                setLoading(true);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
    }

    const loadOrders = () => {
        getOrder(user.token)
            .then((res) => {
                setOrders(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    const loadUsers = () => {
        getAllUsers(user.token)
            .then((res) => {
                setUsers(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    const productSales = products.reduce((acc, item) => {
        return acc + item.sold
    }, 0);

    const productStocks = products.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);

    const totalRevenue = orders.reduce((acc, item) => {
        return acc + item.paymentIntent.amount_total / 100
    }, 0)

    return (
        <AdminLayout>
            <h1 className='text-3xl font-bold m-2 font-serif'>Dashboard</h1>
            <div className='divider'></div>
            {loading ? (
                <div className='text-center'>Loading...</div>
            ) : (
                <>
                    <div className='flex flex-col justify-between items-center gap-5 md:flex-row'>
                        <div className='w-full border border-base-300 p-5 mt-1 ml-1 rounded-xl shadow-md hover:shadow-lg hover:bg-base-200'>
                            <div className='flex justify-between items-center'>
                                <h1 className='capitalize font-serif'>Products total</h1>
                                <InventoryIcon className='text-2xl text-blue-500' />
                            </div>
                            <p className='text-3xl font-bold p-2'>{products.length}</p>
                        </div>
                        <div className='w-full border border-base-300 p-5 mt-1 ml-1 rounded-xl shadow-md hover:shadow-lg hover:bg-base-200'>
                            <div className='flex justify-between items-center'>
                                <h1 className='capitalize font-serif'>Sales</h1>
                                <ShowChartIcon className='text-2xl text-blue-500' />
                            </div>
                            <p className='text-3xl font-bold p-2'>+{productSales}</p>
                        </div>
                        <div className='w-full border border-base-300 p-5 mt-1 ml-1 rounded-xl shadow-md hover:shadow-lg hover:bg-base-200'>
                            <div className='flex justify-between items-center'>
                                <h1 className='capitalize font-serif'>Products In Stock</h1>
                                <InventoryIcon className='text-2xl text-blue-500' />
                            </div>
                            <p className='text-3xl font-bold p-2'>{productStocks}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between items-center gap-5 mt-5 md:flex-row'>
                        <div className='w-full border border-base-300 p-5 mt-1 ml-1 rounded-xl shadow-md hover:shadow-lg hover:bg-base-200'>
                            <div className='flex justify-between items-center'>
                                <h1 className='capitalize font-serif'>Total Revenue</h1>
                                <AttachMoneyIcon className='text-2xl text-blue-500' />
                            </div>
                            <p className='text-3xl font-bold p-2'>${totalRevenue}</p>
                        </div>
                        <div className='w-full border border-base-300 p-5 mt-1 ml-1 rounded-xl shadow-md hover:shadow-lg hover:bg-base-200'>
                            <div className='flex justify-between items-center'>
                                <h1 className='capitalize font-serif'>Orders</h1>
                                <BookmarkBorderIcon className='text-2xl text-blue-500' />
                            </div>
                            <p className='text-3xl font-bold p-2'>{orders.length}</p>
                        </div>
                        <div className='w-full border border-base-300 p-5 mt-1 ml-1 rounded-xl shadow-md hover:shadow-lg hover:bg-base-200'>
                            <div className='flex justify-between items-center'>
                                <h1 className='capitalize font-serif'>Users</h1>
                                <InventoryIcon className='text-2xl text-blue-500' />
                            </div>
                            <p className='text-3xl font-bold p-2'>{users}</p>
                        </div>
                    </div>
                </>
            )
            }
        </AdminLayout>
    )
}

export default Dashboard