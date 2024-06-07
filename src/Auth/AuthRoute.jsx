import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('authtoken');
    if (token) {
      // Assuming the token contains user info encoded in some way or you have a method to fetch user info using the token
      const user = JSON.parse(atob(token.split('.')[1])); // Decode the token's payload
      if (user.user.role === 'customer') {
        navigate('/customer/main');
      } else if (user.user.role === 'maid') {
        navigate('/maid/main');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export default AuthRoute;