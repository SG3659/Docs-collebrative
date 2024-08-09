import { useEffect } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";
import DataTable from "../components/HomeHeader/Datatable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";
// import { useParams } from "react-router-dom";
const home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/auth/get-user-info-by-id",
        {},
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
  return (
    <>
      <Header>
        <div className=" bg-gray-50 w-50% h-80 mt-20 rounded-2xl shadow-2xl ">
          <div className="p-4">
            <div className="w-fit font-google">
              <p className="font">Start a new document </p>
            </div>
          </div>
          <Card />
        </div>
        <div className=" bg-gray-50 mt-10 p-3 flex justify-center rounded-2xl shadow-2xl ">
          <DataTable />
        </div>
      </Header>
    </>
  );
};

export default home;
