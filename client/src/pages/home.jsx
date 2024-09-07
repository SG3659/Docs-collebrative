import { useEffect, useState } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";
import DataCard from "../components/HomeHeader/DataCard";
import { DataTable } from "../components/HomeHeader/Datatable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { FaTableList } from "react-icons/fa6";
import { FaTableCells } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showData, setShowData] = useState(false);
  const [search, setSearch] = useState(" ");
  const [docs, setDocs] = useState("");
  const params = useParams();
  const controller = new AbortController();
  const signal = controller.signal;
  const getData = async () => {
    try {
      const response = await axios.get(
        "/api/docs/getAllDocs?search=" + { search },
        {
          params: {
            userId: params.id,
          },
          signal: signal,
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
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
  // const getUser = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/api/auth/get-user-info-by-id");
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       dispatch(setUser(response.data.data));
  //     } else {
  //       localStorage.clear();
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     localStorage.clear();
  //     navigate("/login");
  //   }
  // };
  useEffect(() => {
    getData();
  }, [search]);
  return (
    <>
      <Header>
        <div className=" bg-gray-50 w-50% h-80 mt-20 rounded-2xl shadow-2xl relative  ">
          <div className="p-4">
            <div className="w-fit font-google">
              <p className="font">Start a new document </p>
            </div>
          </div>
          <Card />
        </div>

        <div className=" bg-gray-50 mt-10 p-3 rounded-2xl shadow-2xl flex flex-col items-center ">
          <div className="flex items-center justify-evenly gap-10">
            <p className=" w-fit font-google font">Recent Document </p>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 border p-3 rounded-full focus:outline-none shadow-lg "
            />
          </div>

          <div>
            {showData ? <DataCard doc={docs} /> : <DataTable doc={docs} />}
            <span
              className=" absolute cursor-pointer "
              onClick={() => setShowData((prev) => !prev)}
            >
              {showData ? (
                <FaTableList fontSize={20} />
              ) : (
                <FaTableCells fontSize={20} />
              )}
            </span>
          </div>
        </div>
      </Header>
    </>
  );
};

export default home;
