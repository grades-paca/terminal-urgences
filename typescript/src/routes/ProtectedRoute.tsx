import { useMe } from '@features/auth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { data: user, isLoading } = useMe();

    if (isLoading) return <div>Chargement...</div>;
    if (!user) return <Navigate to="/" replace />; // redirige vers la home/login

    return <Outlet />;
};
