import { useEffect, useState } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";
import DataCard from "../components/HomeHeader/DataCard";
import DataTable from "../components/HomeHeader/DataTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { FaTableList } from "react-icons/fa6";
import { FaTableCells } from "react-icons/fa6";
import { useParams } from "react-router-dom";
const home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showData, setShowData] = useState(false);

  const [docs, setDocs] = useState("");
  const params = useParams();
  const controller = new AbortController();
  const signal = controller.signal;
  const getData = async () => {
    try {
      const response = await axios.get("/api/docs/getAllDocs", {
        params: {
          userId: params.id,
        },
        signal: signal,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        // console.log(response.data.data);
        setDocs(response.data.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request Canceled", error.message);
      } else {
        console.error("Request failed", error);
      }
    }

    controller.abort();
  };
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
    getData();
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
        <div className=" bg-gray-50 mt-10 p-3 flex justify-center rounded-2xl shadow-2xl relative ">
          {showData ? <DataCard doc={docs} /> : <DataTable doc={docs} />}
          <span
            className="absolute cursor-pointer"
            onClick={() => setShowData((prev) => !prev)}
          >
            {showData ? (
              <FaTableList fontSize={20} />
            ) : (
              <FaTableCells fontSize={20} />
            )}
          </span>
        </div>
      </Header>
    </>
  );
};

export default home;
