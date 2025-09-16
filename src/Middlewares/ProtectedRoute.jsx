import { Navigate } from "react-router-dom";

const hasToken = () => sessionStorage.getItem("token");

export default function ProtectedRoute({ children }) {
  return hasToken() ? <>{children}</> : <Navigate to="/" replace={true} />;
}
