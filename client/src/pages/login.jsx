import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { signInFailure, signInSuccess } from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

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
      const res = await axios.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signInFailure(res.data.message));
        return;
      }
      dispatch(signInSuccess(res.data.data));
      navigate("/");
    } catch (error) {
      dispatch(hideLoading());
      console.error("something went wrong ", error);
    }
  };
  return (
    <div className="from-gray-50 to-blue-500 bg-gradient-to-r h-screen flex justify-center items-center">
      <div>
        <img
          className="w-96 rounded-full shadow-2xl"
          src="https://static.vecteezy.com/system/resources/previews/013/939/288/non_2x/online-account-registration-and-login-concept-woman-who-registers-or-logs-in-to-an-online-account-with-a-user-interface-secure-login-and-password-flat-illustration-vector.jpg"
        />
      </div>
      <div className="w-[550px] p-3">
        <h1 className=" my-7 text-center  text-6xl font-bold italic underline">
          Log-In
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-3  ">
          <input
            className="border p-3 rounded-full focus:outline-none shadow-lg "
            type="text"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <label className="relative">
            <input
              className="border p-3 rounded-full focus:outline-none shadow-lg w-full"
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
            className="border  p-3 rounded-full  text-white hover:opacity-100
        disabled:opacity-80"
          >
            Login
          </button>
        </form>
        <div className="mt-5 flex gap-2">
          <p className="">Don't Have an account?</p>
          <Link to="/signup">
            <span className="text-blue-700 hover:text-white">Register</span>
          </Link>
        </div>
        <div>
          <Link to="/forgot-password">
            <p className="text-blue-700 hover:text-white">Forgot Password</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
