import React from "react";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
const Card = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" flex flex-wrap justify-center  items-center gap-2">
        <div
          className=" bg-white w-40 h-52 flex justify-center items-center rounded-md shadow-md "
          onClick={() => navigate("/docs")}
        >
          <TbPlus fontSize={50} />
        </div>

        <div className=" bg-white w-40 h-52 flex justify-center items-center rounded-md shadow-md ">
          <p>Comming-soon..</p>
        </div>
      </div>
    </>
  );
};

export default Card;
