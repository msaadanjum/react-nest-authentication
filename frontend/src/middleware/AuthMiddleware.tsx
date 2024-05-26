import { Outlet, Navigate } from 'react-router-dom'
import useAuthStore from '../stores/auth';

const AuthMiddleware = () => {
    const { user, accessToken } = useAuthStore();
    return (
        user && accessToken ? <Navigate to={'/dashboard'} /> : <Outlet />
    )
}

export default AuthMiddleware
