import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }) => {

    if (user.token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;