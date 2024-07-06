import React, { useContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { groceryContext } from '../Layout/Layout';

const ProtectedRoute = () => {
    const location = useLocation();
    // const { userLoggedInState } = useContext(groceryContext);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    return (
        isUserLoggedIn ?
            <Outlet /> 
            : <Navigate
                to={'/login'}
                state={{ from: location }} />
    );
};

export default ProtectedRoute;