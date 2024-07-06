import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
const signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-3 max-w-lg mx-auto mt-40">
      <h1 className="text-3xl my-7 text-center text-white font-semibold bg-orange-400 rounded-lg">
        Sign-Up
      </h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3 ">
        <input
          className="border p-3 rounded-lg focus:outline-none shadow-lg"
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={changeHandler}
        />
        <input
          className="border p-3 rounded-lg focus:outline-none shadow-lg"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
        />
        <label className="relative">
          <input
            className="border p-3 rounded-lg focus:outline-none shadow-lg w-full"
            type={showPass ? "text" : "password"}
            placeholder="Password"
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
          Register
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default signup;
