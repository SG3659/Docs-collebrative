import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setDocs } from "../../redux/docsSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
const Datatable = () => {
  const { docs } = useSelector((state) => state.docs);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await axios.get(
        "/api/docs/getAllDocs",
        { userId: params.id },
        {
          headers: {
            Authorization: " Bearer" + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(setDocs(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <div>
      <h1>
        <b>Recent Documents</b>
      </h1>
      <div className="w-[999px] flex flex-wrap justify-center gap-4 p-6 from-bg-gray-50 to-bg-gray-300 b rounded-2xl mt-2">
        {docs && docs.length > 0
          ? docs.map((row, rowIndex) => (
              <div
                key={rowIndex}
                onClick={() => navigate(`/document/${row._id}`)}
                className="w-40 h-60 bg-gray-100 rounded-2xl shadow-2xl flex flex-col justify-center p-2 cursor-pointer"
              >
                <div className="w-36 h-48 bg-white  rounded-xl object-cover "></div>
                <h4 className="text-center">{row.name}</h4>
                <p className="text-xs text-center ">
                  {moment(row.createdAt).format("MMMM Do YYYY")}
                </p>
              </div>
            ))
          : " "}
      </div>
    </div>
  );
};

export default Datatable;
