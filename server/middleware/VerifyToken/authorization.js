const jwt = require("jsonwebtoken");

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Auth failed",
        });
      } else {
        // decode token payload and assign
        req.body.userId = decoded._id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unvalid token key pass  ",
    });
  }
};

module.exports = VerifyToken;
