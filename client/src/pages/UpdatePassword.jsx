import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
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
    const resetString = window.location.pathname.split("/")[3];
    const userId = window.location.pathname.split("/")[2];

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }
    try {
      const response = await axios.post(
        `/api/auth/resetPassword/${userId}/${resetString}`,
        JSON.stringify("newPassword")
      );
      if (response.data.success) {
        toast.success("Password Has Updated Successfully");
        localStorage.clear();
        navigate("/password-reset-success");
      }
    } catch (error) {
      console.error("something went wrong ", error);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="password"
        placeholder="New Password"
        name="newPassword"
        onChange={changeHandler}
        value={formData.newPassword}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={changeHandler}
        value={formData.confirmPassword}
      />
      <button>Submit</button>
    </form>
  );
};

export default UpdatePassword;
