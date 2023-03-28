import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../state/user.state";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
