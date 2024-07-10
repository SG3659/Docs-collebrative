import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { setUser } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
const protectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/auth/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        dispatch(hideLoading());
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default protectedRoute;
