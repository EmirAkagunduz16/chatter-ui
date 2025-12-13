import { JSX, useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import authenticatedVar from "../../constants/authenticated";
import { useReactiveVar } from "@apollo/client/react";
import router from "../Routes";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, loading } = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    // Redirect to login if not authenticated and not on an excluded route
    if (!loading && !user && !authenticated && !excludedRoutes.includes(window.location.pathname)) {
      router.navigate("/login");
    }
  }, [user, loading, authenticated]);

  // If on excluded route (login/signup), always show children
  if (excludedRoutes.includes(window.location.pathname)) {
    return <>{children}</>;
  }

  // If loading, don't show anything yet
  if (loading) {
    return null;
  }

  // Show children only if user is authenticated
  return <>{user && children}</>;
};

export default Guard;

