import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";

const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) return <Navigate to="/admin" />;

  return children;
};

export default ProtectedRoute;
