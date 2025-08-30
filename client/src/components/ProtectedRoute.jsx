import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:' + process.env.PORT + '/api/auth/check-auth', {
      withCredentials: true
    })
    .then(() => setAuth(true))
    .catch(() => {
      setAuth(false);
      navigate('/');
    });
  }, [navigate]);

  if (auth === null) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return children;
};

export default ProtectedRoute;
