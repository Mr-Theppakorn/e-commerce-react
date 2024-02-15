import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

const ProductTable = ({ p }) => {
    const [colors, setColors] = useState(["Black", "White", "Red", "Green", "Yellow"]);
    const dispatch = useDispatch();

    const handleColor = (e) => {

        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].color = e.target.value;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(addToCart(cart));
        }
    }

    const handleQuantityChange = (e) => {
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = e.target.value
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(addToCart(cart));
        }
    }

    const handleRemove = (e) => {
        if (typeof window !== 'undefined') {
            let cart = [];

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            // Use the filter method to create a new cart array without the item to remove
            cart = cart.filter((product) => product._id !== p._id);

            // Update the local storage with the new cart array
            localStorage.setItem('cart', JSON.stringify(cart));

            // Dispatch an action or perform any other necessary tasks
            dispatch(addToCart(cart));
        }
    };

    return (
        <>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xs">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={p.images[0].url} style={{ width: '50px', height: '50px', objectFit: 'contain' }} alt="Product Image" />
                    </th>
                    <td className="md:px-6 py-4">
                        <FormControl>
                            <NativeSelect
                                defaultValue={p.color}
                                inputProps={{
                                    name: 'color',
                                    id: 'uncontrolled-native',
                                }}
                                className='text-xs'
                                onChange={handleColor}
                            >
                                {colors.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </NativeSelect>
                        </FormControl>

                    </td>
                    <td className="md:px-6 py-4">
                        {p.brand}
                    </td>
                    <td className="md:px-6 py-4">
                        {p.price}
                    </td>
                    <td className="md:px-6 py-4">
                        <input min="1" style={{ width: '50px', height: '30px' }} type="number" value={p.count} onChange={handleQuantityChange}
                        />
                    </td>
                    <td className="md:px-6 py-4">
                        <Button variant="outlined" className='text-xs p-0 md:p-2 md:text-sm' color='error' onClick={handleRemove}>Remove</Button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

export default ProductTable;