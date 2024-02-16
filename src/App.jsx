import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { auth } from "./assets/firebase"
import { addUser } from "./store/slices/userSlice"
import { useSelector } from 'react-redux';
import { getCurrentUser } from "./api/auth"
const Header = React.lazy(() => import("./components/Header"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));
const History = React.lazy(() => import("./pages/user/History"));
const PrivateRoute = React.lazy(() => import("./components/routes/PrivateRoute"));
const Profile = React.lazy(() => import("./pages/user/Profile"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRoute = React.lazy(() => import("./components/routes/AdminRoute"));
const ProductCreate = React.lazy(() => import("./pages/product/ProductCreate"));
const ProductList = React.lazy(() => import("./pages/admin/products/ProductList"));
const Products = React.lazy(() => import("./components/Products"));
const Cart = React.lazy(() => import("./components/Cart"));
const ProductDetail = React.lazy(() => import("./pages/product/ProductDetail"));
const CategoryPage = React.lazy(() => import("./pages/category/CategoryPage"));
const Shop = React.lazy(() => import("./pages/Shop"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Payment = React.lazy(() => import("./pages/Payment"));
const AdminOrders = React.lazy(() => import("./pages/admin/AdminOrders"));
const Wishlist = React.lazy(() => import("./pages/user/Wishlist"));
const Footer = React.lazy(() => import("./components/Footer"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const MyProfile = React.lazy(() => import("./pages/user/MyProfile"));
const SubPage = React.lazy(() => import("./pages/sub/SubPage"));
const Successfully = React.lazy(() => import("./pages/Successfully"));
const ProtectedRoute = React.lazy(() => import('./components/routes/ProtectedRoute'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const idTokenResult = await authUser.getIdTokenResult();
          const res = await getCurrentUser(idTokenResult.token);
          const { data } = res
          dispatch(addUser({ name: data.name, image: data.image, email: data.email, token: idTokenResult.token, role: data.role, id: data._id }));
        } catch (err) {
          console.error('Error retrieving user data:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    // Return a cleanup function to unsubscribe from the auth state changes
    return () => {
      unsubscribe();
    };

  }, [auth, dispatch]);

  if (loading) {
    return <></>;
  }

  return (
    <Suspense fallback={<div className='flex justify-center items-center h-screen'>
      <div className=" animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>}>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/successfully/:order_id" element={<Successfully />} />
        <Route path="/products/:_id" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/subs/:slug" element={<SubPage />} />
        <Route path="/login" element={<ProtectedRoute user={user}><Login /></ProtectedRoute>} />
        <Route path="/login/forgot" element={<ForgotPassword user={user} />} />
        <Route path="/register" element={<ProtectedRoute user={user}><Register /></ProtectedRoute>} />
        <Route path="/user/Profile" element={<PrivateRoute user={user}><MyProfile /></PrivateRoute>} />
        <Route path="/user/profile/password" element={<PrivateRoute user={user}><Profile /></PrivateRoute>} />
        <Route path="/user/history" element={<PrivateRoute user={user}><History /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute user={user}><Payment /></PrivateRoute>} />
        <Route path="/user/wishlist" element={<PrivateRoute user={user}><Wishlist /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute user={user}><Dashboard user={user} /></AdminRoute>} />
        <Route path="/admin/category" element={<AdminRoute user={user}><AdminDashboard user={user} /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute user={user}><AdminOrders user={user} /></AdminRoute>} />
        <Route path="/admin/product/create" element={<AdminRoute user={user}><ProductCreate user={user} /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute user={user}><ProductList user={user} /></AdminRoute>} />
        <Route path="/user/Product/edit/:_id" element={<AdminRoute user={user}><ProductCreate user={user} /></AdminRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Suspense>
  )
}

export default App
