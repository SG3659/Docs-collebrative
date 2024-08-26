import { Navigate } from "react-router-dom";
const protectedRoute = (props) => {
  if (localStorage.getItem("persist:root")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default protectedRoute;

// import { useSelector } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";

// export default function PrivateRoute() {

//   const { user } = useSelector((state) => state.user);

//   return user ? <Outlet /> : <Navigate to="/login" />;
// }
