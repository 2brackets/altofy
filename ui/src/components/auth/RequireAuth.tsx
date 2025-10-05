import { Navigate, useLocation } from "react-router-dom";
import { Session } from "../../lib/session";
import type { JSX } from "react";

type Props = { children: JSX.Element };

export default function RequireAuth({ children }: Props) {
  const location = useLocation();

  if (!Session.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
