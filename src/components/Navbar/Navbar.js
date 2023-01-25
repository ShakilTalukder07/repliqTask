import React, { useState } from 'react';
import '../../Pages/Home/Banner/Banner.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useState(AuthContext)
    const navigate = useNavigate()

    console.log(user,"hello,");

    const handleLogOut = () => {
        logOut()
            .then(() => { })
        navigate('/')
            .catch(error => console.error(error))
    }

    const menuItems = <>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
        {
            user?.uid ?
                <>
                    <li><button onClick={handleLogOut}>Sign Out</button></li>
                </> :
                <li><Link to="/login">Login</Link></li>
        }
    </>

    return (
        <div>
            <div className="navbar background">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">REPLIQ</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link className="btn">Get started</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;