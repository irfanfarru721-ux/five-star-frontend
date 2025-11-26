import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role mismatch
  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
}
