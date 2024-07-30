import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setDocs } from "../../redux/docsSlice";
import { useSelector, useDispatch } from "react-redux";
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
    <div className="w-[999px] flex flex-wrap justify-center gap-10 p-6 bg-gray-200 rounded-lg shadow-2xl">
      {docs && docs.length > 0
        ? docs.map((row, rowIndex) => (
            <div
              key={rowIndex}
              onClick={() => navigate(`/document/${row._id}`)}
              className="w-40 h-60 bg-gray-100 rounded-2xl shadow-2xl flex flex-col justify-center p-2 cursor-pointer"
            >
              <div className="w-36 h-48 bg-white  rounded-xl object-cover "></div>
              <h4 className="text-center">{row.name}</h4>
              <p className="text-xs">{row.createdAt}</p>
            </div>
          ))
        : "Loading..."}
    </div>
  );
};

export default Datatable;
