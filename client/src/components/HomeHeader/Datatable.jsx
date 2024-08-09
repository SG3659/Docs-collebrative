import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Datatable = () => {
  const [docs, setDocs] = useState("");
  const params = useParams();
  const navigate = useNavigate();
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
