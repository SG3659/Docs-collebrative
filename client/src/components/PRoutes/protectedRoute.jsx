
import { Navigate } from "react-router-dom";

const protectedRoute = (props) => {
  
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login"/>;
  }
};

export default protectedRoute;
