import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

export default function ProtectRoute() {
      const { auth } = useAuth()

      //return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
      return auth ?
                  <Outlet />
                  :
                  <Navigate to="/login" />
}
