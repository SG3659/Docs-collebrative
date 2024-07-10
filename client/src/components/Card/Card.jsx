import React from "react";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import "./card.css";
const Card = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" card-main ">
        <div className="editor-card" onClick={() => navigate("/docs")}>
          <TbPlus fontSize={50} />
        </div>

        <div className="editor-card">
          <p>Comming-soon..</p>
        </div>
      </div>
    </>
  );
};

export default Card;
