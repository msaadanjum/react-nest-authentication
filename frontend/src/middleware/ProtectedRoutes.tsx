import { Outlet, Navigate } from 'react-router-dom'
import useAuthStore from '../stores/auth';

const PrivateRoutes = () => {

    const { accessToken } = useAuthStore();
    return (
        accessToken ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes
