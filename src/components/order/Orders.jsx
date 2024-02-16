import React from 'react'
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const Orders = ({ orders, handleStatus }) => {

    return (
        <div className="overflow-x-auto">
            <table className="mt-5 text-left w-full text-gray-500 dark:text-gray-400 text-xs">
                <thead className=" text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            Order ID
                        </th>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            Currency
                        </th>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            Method
                        </th>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            Payment
                        </th>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="p-2 md:px-6 py-3">
                            OrderStatus
                        </th>
                    </tr>
                </thead>
                {orders?.map((o) => (
                    <tbody key={o._id}>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="p-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {o.paymentIntent.payment_intent}
                            </th>
                            <td className="p-2 md:px-6 py-4">
                                ${o.paymentIntent.amount_total / 100}
                            </td>
                            <td className="p-2 md:px-6 py-4 uppercase">
                                {o.paymentIntent.currency}
                            </td>
                            <td className="p-2 md:px-6 py-4 capitalize">
                                {o.paymentIntent.payment_method_types}
                            </td>
                            <td className="p-2 md:px-6 py-4 capitalize">
                                {o.paymentIntent.status}
                            </td>
                            <td className="p-2 md:px-6 py-4">
                                {new Date(o.paymentIntent.created * 1000).toLocaleDateString()}
                            </td>
                            <td className="p-2 md:px-6 py-4">
                                <FormControl>
                                    <NativeSelect
                                        defaultValue={o.orderStatus}
                                        onChange={(e) => handleStatus(o._id, e.target.value)}
                                    >
                                        <option value="Not Processed">Not Processed</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Completed">Completed</option>
                                    </NativeSelect>
                                </FormControl>

                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default Orders;