import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { hasToken } = useAuth();
  return hasToken ? <>{children}</> : <Navigate to="/" replace={true} />;
}
