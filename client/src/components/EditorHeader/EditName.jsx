import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditName = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [docs, setDocs] = useState(null);
  const getDocsData = async () => {
    try {
      const response = await axios.post("/api/docs/get-docs-info", {
        userId: params.id,
      });
      if (response.data.success) {
        setDocs(response.data.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocsData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (docs) {
      // If docs data is available, update the form data with docs's information
      setFormData({
        name: docs.name || "",
      });
    }
  }, [docs]);

  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/docs/change-name", {
        ...formData,
        userId: params.id,
      });
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  return (
    <div className="  top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-4 w-1/2  relative">
        {docs && (
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Docs Untitled"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
            <button
              className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 w-full text-center
        disabled:opacity-80  mt-7 "
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditName;
