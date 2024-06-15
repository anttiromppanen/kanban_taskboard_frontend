import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { token } = useAuth();

  if (token === null) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
