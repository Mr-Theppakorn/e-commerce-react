import { Container, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductTable from "./cards/ProductTable";
import { useNavigate } from "react-router-dom";
import { saveCart } from "../api/product";
import { toast } from "react-toastify";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const getTotal = () => {
        return cart.reduce((acc, item) => {
            return acc + item.count * item.price;
        }, 0);
    };
    console.log(cart);
    const saveOrderToDb = () => {
        saveCart(cart, token)
            .then((res) => {
                console.log(res.data);
                navigate("/checkout");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showCartItems = () => (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="md:px-6 py-3">
                        Image
                    </th>
                    <th scope="col" className="md:px-6 py-3">
                        Color
                    </th>
                    <th scope="col" className="md:px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="md:px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="md:-6 py-3">
                        Quantity
                    </th>
                </tr>
            </thead>
            {cart.map((p) => (
                <ProductTable key={p.id} p={p} />
            ))}
        </table>
    );

    return (
        <Container className="h-screen">
            <div className="md:flex flex-row m-5">
                <div className="basis-10/12">
                    <h1 className="text-2xl font-bold m-5">Cart</h1>
                    {showCartItems()}
                </div>
                <div className="basis-2/5 border border-base-300 p-5 mt-5 ml-1 rounded shadow-md">
                    <h1 className="text-center text-2xl font-bold mb-1">Order Summary</h1>
                    <hr />
                    <p className="font-bold my-2">Products : {cart.length} </p>
                    {cart.map((c, i) => (
                        <div className="my-2" key={i}>
                            <p>
                                {c.title} x {c.count} = ${c.price * c.count}
                            </p>
                        </div>
                    ))}
                    <hr className="my-2" />
                    Total: <b className="my-2">${getTotal()}</b>
                    <hr className="my-2" />
                    <div className="flex justify-center">
                        {cart.length > 0 ? (
                            token ? (
                                <Button
                                    className="mt-3"
                                    variant="outlined"
                                    onClick={saveOrderToDb}
                                >
                                    Checkout
                                </Button>
                            ) : (
                                <button
                                    className="btn btn-success mt-3"
                                    onClick={() => navigate("/login")}
                                >
                                    Go to Login
                                </button>
                            )
                        ) : (
                            <button
                                className="btn btn-success mt-3"
                                onClick={() => navigate("/")}
                            >
                                Go to Shop
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Cart;
