import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getUserData } from "../../Redux/slices/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn , data } = useSelector((state) => state.auth);
  const location = useLocation();
   const dispatch = useDispatch()
  
  useEffect(()=>{
         (()=>{
           dispatch(getUserData)
         })()
  })

  return data && isLoggedIn && allowedRoles.find((myRole) => myRole === data?.role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
 
};

export default RequireAuth;
