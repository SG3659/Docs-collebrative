import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Datatable = () => {
  const [docs, setDocs] = useState();
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
        setDocs(response.data.data);
        //   console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <>
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
        : "CREATE NEW DATA"}
    </>
  );
};

export default Datatable;
