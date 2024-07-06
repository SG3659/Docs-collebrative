import React from "react";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
const Card = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" flex flex-wrap justify-center items-center gap-5 overflow-x-hidden overflow-y-hidden">
        <div
          className="bg-white w-40 h-60  rounded-md shadow-md border-2 cursor-pointer"
          onClick={() => navigate("/docs")}
        >
          <div className="flex justify-center items-end mt-20">
            <TbPlus fontSize={50} />
          </div>
        </div>

        <div className="bg-white w-40 h-60  rounded-md shadow-md border-2 flex justify-center items-center cursor pointer">
          <p>Comming-soon..</p>
        </div>
      </div>
    </>
  );
};

export default Card;
