import { useMe } from '@services/auth/useMe';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { data: user, isLoading } = useMe();

    if (isLoading) return <div>Chargement...</div>;
    if (!user) return <Navigate to="/" replace />;

    return <Outlet />;
};
