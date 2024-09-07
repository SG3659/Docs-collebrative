import { useNavigate } from "react-router-dom";
import moment from "moment";

const DataCard = ({ doc }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[999px] flex flex-wrap justify-center gap-4 p-6 from-bg-gray-50 to-bg-gray-300 b rounded-2xl mt-2">
      {doc && doc.length > 0
        ? doc.map((row, rowIndex) => (
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
  );
};

export default DataCard;
