import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Search from './forms/Search';
import MenuIcon from '@mui/icons-material/Menu';

const settings = [

    {
        name: 'Profile',
        path: 'user/profile'
    },
    {
        name: 'Wishlist',
        path: 'user/wishlist'
    },
    {
        name: 'Order',
        path: 'user/history'
    },
    {
        name: 'Password',
        path: 'user/profile/password'
    },
    {
        name: 'Logout'
    }
];

const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(false);
    };

    const onLogout = () => {
        firebase.auth().signOut();
        dispatch(userLogout({
            name: '',
            email: '',
            token: null,
            role: '',
            id: ''
        }));
        navigate('/login');
        setAnchorElUser(false);
    }

    const totalPrice = (cart) => {
        const total = cart?.reduce((acc, c) => {
            const itemTotal = c.price * c.count;
            return acc + itemTotal;
        }, 0);
        return total;
    };


    return (
        <Box sx={{ flexGrow: 2 }} className="sticky top-0 z-10">
            <AppBar position="static">
                <Toolbar className='bg-blue-600'>
                    <Typography className='hidden sm:flex' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className='text-white bg-blue-00 p-2 rounded font-semibold hover:bg-blue-500 md:p-5' underline="none" to="/">Home</Link>
                        <Link className='text-white  bg-blue-00 p-2 rounded font-semibold hover:bg-blue-500 md:p-5' underline="none" to="/shop">Shop</Link>
                    </Typography>
                    <div className="drawer w-24 sm:hidden">
                        <input id="my-drawer" type="checkbox" checked={drawerOpen} onChange={() => setDrawerOpen(!drawerOpen)} className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-primary drawer-button border-none bg-blue-600 hover:bg-blue-500 sm:hidden"><MenuIcon /></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <li><Link to="/" onClick={() => setDrawerOpen(false)} className="close sidebar">Home</Link></li>
                                <li><Link to="/shop" onClick={() => setDrawerOpen(false)} className="close sidebar">Shop</Link></li>
                                <div className='divider' />
                                {user.token && user.role === "admin" && (
                                    <>
                                        <div className='text-center text-2xl mb-5'>Admin</div>
                                        <li><Link to="/admin/dashboard" onClick={() => setDrawerOpen(false)} className="close sidebar">Dashboard</Link></li>
                                        <li><Link to="/admin/category" onClick={() => setDrawerOpen(false)} className="close sidebar">Category</Link></li>
                                        <li><Link to="/admin/products" onClick={() => setDrawerOpen(false)} className="close sidebar">Products</Link></li>
                                        <li><Link to="/admin/orders" onClick={() => setDrawerOpen(false)} className="close sidebar">Orders</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <Search />
                    {user.token === null && <Button color="inherit">
                        <Link underline="none" color="inherit" to="/login">
                            Login
                        </Link>
                        <LoginIcon />
                    </Button>}
                    {user.token === null &&
                        <Button color="inherit">
                            <Link underline="none" color="inherit" to="/register">
                                Register
                            </Link>
                            <HowToRegIcon />
                        </Button>
                    }
                    <div className="flex-none mx-2">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator bg-red">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item bg-red-600 border-none text-white">{cart.length}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg text-black">{cart.length} Items</span>
                                    <span className=" text-black">Total: {totalPrice(cart)}</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block" onClick={() => navigate('/cart')}>View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tooltip title="Open settings">
                        <Box sx={{ flexGrow: 0 }}>
                            {user.token &&
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Tao" src={user?.image?.url} />
                                </IconButton>
                            }
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {user.role === 'admin' && <MenuItem onClick={handleCloseUserMenu}>
                                    <Link component="a" to='/admin/dashboard' textAlign="center">Admin</Link>
                                </MenuItem>}
                                {settings.map((setting, index) => (
                                    setting.name === 'Logout' ? (
                                        <MenuItem key={index} onClick={onLogout}>
                                            <Typography textAlign="center">{setting.name}<LoginIcon /></Typography>
                                        </MenuItem>
                                    ) : (
                                        <MenuItem key={index} onClick={handleCloseUserMenu}>
                                            <Link to={`/${setting.path}`} textAlign="center">{setting.name}</Link>
                                        </MenuItem>
                                    )

                                ))}
                            </Menu>
                        </Box>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;