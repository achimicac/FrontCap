import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Alert from '../components/Alert';
import toast from "react-hot-toast";
import CannotAccess from '../components/CannotAccess';

const ProtectedRoute = ({role}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('authtoken');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      if (user.user.role === role) {
        setLoading(false); // User is authorized
      } else {
            <CannotAccess message={'คุณไม่มีสิทธิ์เข้าถึงหน้านี้'}/>
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <CannotAccess message={'คุณไม่มีสิทธิ์เข้าถึงหน้านี้'}/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;