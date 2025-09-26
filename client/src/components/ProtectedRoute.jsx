import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BackendUrl}/auth/check-auth`, {
        withCredentials: true,
      })
      .then(() => setAuth(true))
      .catch(() => {
        setAuth(false);
        navigate("/");
      });
  }, [navigate, BackendUrl]);

  if (auth === null) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return children;
};

export default ProtectedRoute;
