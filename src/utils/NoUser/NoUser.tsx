import { Navigate } from "react-router-dom";
import Loading from "../../utils/Loading/Loading";
import { useAuth } from "../../contexts/Auth/AuthContext";

export const NoUser = ({ children }: { children: React.ReactNode }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
