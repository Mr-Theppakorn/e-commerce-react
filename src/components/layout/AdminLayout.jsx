import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
const menus = [
    {
        name: "Dashboard",
        routeName: "/admin/dashboard",
    },
    {
        name: "Category",
        routeName: "/admin/category",
    },
    {
        name: "Products",
        routeName: "/admin/products",
    },
    {
        name: "Orders",
        routeName: "/admin/orders",
    }
];

const AdminLayout = (props) => {

    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('');

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, []);

    return (
        <div>
            <div className="lg:drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content my-4 mx-4">
                    {props.children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <div className="text-3xl font-bold mx-auto mb-5">AdminDashboard</div>
                        <li>
                            {menus.map((m, index) => (
                                <Link key={index} className={activeMenu === m.routeName ? 'text-white active' : 'text-black'} underline="none" to={m.routeName}>{m.name}</Link>
                            ))}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout