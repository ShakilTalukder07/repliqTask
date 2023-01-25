import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useCustomer from '../components/hooks/useCustomer';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

const CustomerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isCustomer, isCustomerLoading] = useCustomer(user?.email);
    const location = useLocation()

    if (loading || isCustomerLoading) {
        return <Spinner></Spinner>
    }

    if (user && isCustomer === 'customer') {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default CustomerRoute;