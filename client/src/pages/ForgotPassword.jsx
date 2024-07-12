import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/requestPasswordReset",
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success("Email Sent Successfully Please Check Your Email");
        localStorage.setItem("email", formData.email);
        navigate("/email-sent");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("something went wrong ", error);
    }
  };
  return (
    <div className="from-gray-50 to-blue-500 bg-gradient-to-r h-screen flex items-center justify-center p-12 py-6">
      <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-10 rounded-full">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
          <div className="flex justify-center md:justify-end">
            <img
              className="w-full max-w-sm rounded-full"
              src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-4652.jpg?w=2000"
              alt="Marketing newsletter via computer Illustration in PNG, SVG"
            />
          </div>
          <div className="flex items-center">
            <div className="mx-auto md:mx-0">
              <h3 className="text-4xl font-bold text-white">Reset Password</h3>
              <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <form onSubmit={submitHandler} className="flex flex-col gap-1">
                <input
                  className="border p-3 rounded-full focus:outline-none shadow-lg "
                  type="email"
                  placeholder="Enter the email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                />
                <button className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-bold rounded-full group">
                  <span className=" text-white group-hover:text-black">
                    Send Reset Email
                  </span>
                  <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
