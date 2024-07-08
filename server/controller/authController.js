const User = require("../Model/userModel");

const CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    return res.json({
      success: true,
      message: "user create successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};
const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = user.generateAuthToken();
    await user.incrementLoginCount();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    res.json({
      success: true,
      message: "Login Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be Login, please try again later",
    });
  }
};
module.exports = { CreateUser, Login };
