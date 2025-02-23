import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }

    return !user ? children : <Navigate to="/dashboard" />;
};
export default PublicRoute;