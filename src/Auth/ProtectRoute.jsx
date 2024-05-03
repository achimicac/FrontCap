import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

export default function ProtectRoute({protectrole}) {
      const { auth } = useAuth()

      //return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
      return auth ?
                  <Navigate to="/" />
                  :
                  <Navigate to="/login" />
}
