import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><Link to="/dashboard/allCustomers">All Customers</Link></li>
                        <li><Link to="/dashboard/addACustomer">Add a Customer</Link></li>
                        <li><Link to='/dashboard/allProducts'>All Products</Link></li>
                        <li><Link to="/dashboard/addAProduct">Add a Product</Link></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;