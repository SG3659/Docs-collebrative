import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { v4 as uuidV4 } from "uuid";
const Card = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [docName, setDocName] = useState("");
  const createDoc = (docId) => {
    navigate(`/document/${docId}`);
  };
  const submitHandler = () => {
    const id = uuidV4();
    localStorage.setItem(`document-name-for-${id}`, docName);
    createDoc(id);
  };
  return (
    <>
      <div className=" flex flex-wrap justify-center  items-center gap-2">
        <div
          className=" bg-white w-40 h-52 flex justify-center items-center rounded-md shadow-md "
          onClick={() => setToggle(!toggle)}
        >
          <TbPlus fontSize={50} />
        </div>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } absolute  top-48  bg-opacity-100  z-10 flex items-center justify-center `}
        >
          <div className=" flex justify-center items-center flex-col bg-slate-100 w-96 h-72 p-2 rounded-xl">
            <p className="text-center p-2
            ">
              Enter a name for your document. Click create when you're done.
            </p>
            <form
              onSubmit={submitHandler}
              className="flex items-center flex-col"
            >
              <label>Name</label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                value={docName}
                onChange={(e) => {
                  setDocName(e.target.value);
                }}
                className="border p-3 rounded-full focus:outline-none shadow-lg mb-3 w-80"
              />
              <button
                style={{ backgroundColor: "rgb(10, 110, 209)" }}
                type="submit"
                className="border  p-3 rounded-full  text-white hover:opacity-100
                 disabled:opacity-80 w-64"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
