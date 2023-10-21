import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = {loggedIn:useSelector(state => state.auth.isLoggedIn)};
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth? <Outlet/>:<Navigate to="/signin"/>;
};

export default ProtectedRoutes;