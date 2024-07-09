import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
const login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/auth/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        // console.log(response.data);
        localStorage.setItem("token", response.data.data);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("something went wrong ", error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto mt-40">
      <h1 className="text-3xl my-7 text-center text-white font-semibold bg-orange-400 rounded-lg">
        Log-In
      </h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3 ">
        <input
          className="border p-3 rounded-lg focus:outline-none shadow-lg"
          type="text"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
        />
        <label className="relative">
          <input
            className="border p-3 rounded-lg focus:outline-none shadow-lg w-full"
            type={showPass ? "text" : "password"}
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
          <span
            className="absolute right-5 top-4 cursor-pointer "
            onClick={() => setShowPass((prev) => !prev)}
          >
            {showPass ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
        </label>
        <button
          className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-95
        disabled:opacity-80"
        >
          Login
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p className="hover:font bold">Don't Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default login;
