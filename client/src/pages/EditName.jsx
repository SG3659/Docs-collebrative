import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditName = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/docs/editFileName", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.data) {
        navigate("/docs");
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };
  return (
    <div className="  top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-4 w-1/2  relative">
        <form onSubmit={submitHandler}>
          <label>
            Enter the file name:
            <input
              type="text"
              placeholder="Docs Untitled"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
          </label>

          <button
            className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 w-full text-center
        disabled:opacity-80  mt-7 "
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditName;
