import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const token = useAuth((s) => s.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}
