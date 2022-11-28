import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <Loading />;

  if (user.uid) return children;

  return <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
