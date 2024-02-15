import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { createCoupon, getCoupon, removeCoupon } from '../../../api/coupon'
import AdminLayout from '../../../components/layout/AdminLayout';


const CreateCoupon = () => {
    const [coupon, setCoupon] = useState([]);
    const [name, setName] = useState("");
    const [exp, setExp] = useState("");
    const [discount, setDiscount] = useState("")
    const { token } = useSelector(state => state.user)

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = () => {
        getCoupon().then((res) => {
            setCoupon(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const expiry = exp.format('MM/DD/YYYY')
        createCoupon({ name, expiry, discount }, token)
            .then((res) => {
                setName("");
                setExp("");
                setDiscount("");
                loadCoupons();
                toast.success('Create Coupon Successful!');
            }).catch((err) => {
                console.log(err);
            });
    }

    const onRemove = (couponId) => {
        removeCoupon(couponId, token)
            .then((res) => {
                const newCoupon = coupon.filter((c) => c._id !== couponId);
                console.log(newCoupon);
                setCoupon(newCoupon);
                toast.success('Remove Coupon Successful!');
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <AdminLayout>
            <Container>
                <h1 className='m-5 text-2xl font-bold'>Create Coupon</h1>
                <form className='flex justify-around items-center' onSubmit={handleSubmit}>
                    <TextField
                        id="coupon"
                        label="Coupon Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        id="discount"
                        type="number"
                        label="Discount %"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" value={exp}
                                onChange={(newValue) => setExp(newValue)} required />
                        </DemoContainer>
                    </LocalizationProvider>
                    <div>
                        <Button className='p-3' variant="contained" type='submit'>
                            Create
                        </Button>
                    </div>
                </form>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
                    <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Expiry
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Discount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupon.map((c) => (
                            <tr key={c._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {c.name}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(c.expiry).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {c.discount}%
                                </td>
                                <td className="px-6 py-4">
                                    <Button variant="outlined" color='error' onClick={() => onRemove(c._id)} >Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </AdminLayout>

    );
}

export default CreateCoupon;