import { Navigate } from "react-router-dom";

const publicRoutes = (props) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
};
export default publicRoutes;
