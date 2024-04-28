import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

export default function ProtectRoute({protectrole}) {
      const { auth } = useAuth()
      const isAuthenticated = true;

      //return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
      return auth?.role === protectrole ? 
            <Outlet/> 
            :
            auth?.user ?
                  console.log("caanot access to this route")
                  :
                  <Navigate to="/login" />
}
