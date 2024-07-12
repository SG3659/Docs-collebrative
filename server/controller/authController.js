const User = require("../Model/userModel");
const PasswordReset = require("../Model/passwordResetModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const nodemailer = require("nodemailer");
// nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  // host: 'smtp.ethereal.email',
  // port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

const CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Name Exists",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email Exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    // console.log(user);
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
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      })
      .json({
        success: true,
        message: "Login Success",
        data: token,
        ...rest,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be Login, please try again later",
    });
  }
};
const UserData = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  user.password = undefined;
  try {
    if (!user) {
      return res.json({
        success: false,
        message: "user not exists",
      });
    } else {
      return res.json({
        success: true,
        data: {
          name: user.username,
          email: user.email,
          photo: user.profileImageURL,
        },
        message: "user exists",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// create reset password api 
const ResetPassword = async (req, res) => {
  const { email } = req.body;
  const name = User.username;
  const redirectUrl = "http://localhost:5713/reset-password";
  // check if email exists
  User.find({ email })
    .then((data) => {
      if (data.length) {
        //User exists
        sendResetEmail(data[0], redirectUrl, res);
      } else {
        res.json({
          success: false,
          message: "Email Does not exist",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong",
      });
    });
  // send reset email
  const sendResetEmail = ({ _id, email, username }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;
    // First, we clear all existing reset records
    PasswordReset.deleteMany({ userId: _id })
      .then((result) => {
        // Reset records deleted successfully

        // Now, we create a new reset record

        // mail option
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Password Reset",
          html: `
          Hello ${username},
          <br/>
          <br/>
          Please click on the link below to reset your password.
          <br/>
          <br/>
          <a href="${redirectUrl}/${_id}/${resetString}">Reset Password</a>
          the link will expire in 1 hour.
          <br/>
          <br/>
          If you did not request this, please ignore this email.
          <br/>
          <br/>
          Thank you.
          `,
        };
        // hash the reset String
        const saltRound = 10;
        bcrypt
          .hash(resetString, saltRound)
          .then((hashedResetString) => {
            // set values in password reset collection
            const newPasswordReset = new PasswordReset({
              userId: _id,
              resetString: hashedResetString,
              createdAt: Date.now(),
              expiresAt: Date.now() + 3600000,
            });
            newPasswordReset
              .save()
              .then(() => {
                transporter.sendMail(mailOptions);
                // reset email sent and passsword reset record saved
                res.json({
                  success: true,
                  message:
                    "Password reset email sent successfully please check your email",
                });
              })
              .catch((error) => {
                console.log(error);
                res.json({
                  success: false,
                  message: "Password reset email failed",
                });
              });
          })
          .catch((error) => {
            console.log(error);
            res.json({
              success: false,
              message:
                "An error occured while hashing the password reset data!",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          success: false,
          message: "Clearing existing password reset records failed",
        });
      });
  };
};
// update password
const UpdatePassword = async (req, res) => {
  let { userId, resetString } = req.params;
  let { newPassword } = req.body;

  PasswordReset.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // password reset record exists so we proceed

        const { expiresAt } = result[0];
        const hashedResetString = result[0].resetString;

        // checking for expired reset string
        if (expiresAt < Date.now()) {
          PasswordReset.deleteOne({ userId })
            .then(
              // Reset record deleted successfully
              () => {
                res.json({
                  success: false,
                  message: "Password reset link has expired",
                });
              }
            )
            .catch((error) => {
              // deletion failed
              console.log(error);
              res.json({
                success: false,
                message: "Clearing password reset record failed",
              });
            });
        } else {
          // valid reset record exists so we validate the reset string
          // First compare the hashed reset string

          bcrypt
            .compare(resetString, hashedResetString)
            .then((result) => {
              if (result) {
                // strings matched
                // hash password again
                const saltRounds = 10;
                bcrypt
                  .hash(newPassword, saltRounds)
                  .then((hashedNewPassword) => {
                    // update user password
                    User.updateOne(
                      { _id: userId },
                      { password: hashedNewPassword }
                    )
                      .then(() => {
                        // update complete. Now delete the reset record
                        PasswordReset.deleteOne({ userId })

                          .then(() => {
                            // both user record and reset record updated
                            res.json({
                              success: true,
                              message: "Password has been reset successfully.",
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                            res.json({
                              success: false,
                              message:
                                "An error occured while finalizing password reset.",
                            });
                          });
                      })
                      .catch((error) => {
                        console.log(error);
                        res.json({
                          success: false,
                          message: "Updting user password failed.",
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.json({
                      success: false,
                      message:
                        "An error occured while hashing the new password.",
                    });
                  });
              } else {
                // Existing record but incorrect reset string passed.
                res.json({
                  success: false,
                  message: "Invalid password reset details passed.",
                });
              }
            })

            .catch((error) => {
              console.log(error);
              res.json({
                success: false,
                message: "Comparing password reset strings failed.",
              });
            });
        }
      } else {
        // Password reset record doesn't exist
        res.json({
          success: false,
          message: "Password link either doesn't exist or has expired.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
        message: "Checking for exsitng password reset records failed.",
      });
    });
};
module.exports = { CreateUser, Login, UserData, ResetPassword, UpdatePassword };
