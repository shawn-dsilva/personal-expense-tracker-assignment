// src/components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAuthUser } from '../hooks/useGetAuthUser';

const ProtectedRoute = () => {
    const { data: user, isLoading } = useGetAuthUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user && !isLoading) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;