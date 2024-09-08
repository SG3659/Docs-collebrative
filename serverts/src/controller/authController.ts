import { Request, Response } from "express";
import User from "../model/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import PasswordReset from "../model/passwordResetModel"
import nodemailer,{Transporter} from"nodemailer"
import {v4 as uuidv4} from "uuid"
import dotenv from "dotenv"
dotenv.config();

const createUser = async (req: Request, res: Response): Promise<Response> => {
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

     const salt = await bcrypt.genSalt(16);
     const hashPassword = await bcrypt.hash(password, salt);
 
     const user = await User.create({
       username,
       email,
       password: hashPassword,
     });
 
     await user.save();
 
     return res.json({
       success: true,
       message: "User created successfully in typescript ",
     });
   } catch (error) {
     console.error(error);
     return res.status(500).json({
       success: false,
       message: "User cannot be registered, please try again later",
     });
   }
 };

 const loginUser =async(req:Request, res:Response): Promise<Response> => {
   const {email,password}=req.body;
   try {
      const user =await User.findOne({email})
      if(!user){
         return res.status(401).json({
            success:false,
            message:"Invalid Email"
         })
      }
      const isMatch =await bcrypt.compare(password,user.password);
      if(!isMatch){
         return res.status(401).json({
            success:false,
            message:"Invalid Password"
         })
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_PASSWORD as string, {
         expiresIn: "1d",
       });
      
       const { password: pass, ...rest } = user.toObject();
       return res
       .cookie("access_token", token, {
         httpOnly: true,
         sameSite: "strict",
         secure: false, 
       })
       .json({
         success: true,
         user: rest,
       });

   } catch (error) {
      console.log(error)
      return res.status(500).json({
         success:false,
         message:"User cannot be login, pls try again later "
      })
   }
 }

 const userData =async(req:Request,res:Response):Promise<Response>=>{
   const user = await User.findOne({ _id: req.body.userId }).select("-password"); 
   try {
      if(!user){
         return res.status(401).json({
            success: false,
            message: "user not exists",
         })
      }else{
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
      console.log(error)
      return res.status(500).json({
         success:false,
         message:"Something Wrong"
      })
   }
}
 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("Error setting up email transporter:", error);
  } else {
    console.log("Email transporter ready for messages:", success);
  }
});


const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const redirectUrl = "http://localhost:5173/reset-password";

  try {
    const user = await User.findOne({ email });
    if (user) {
      await sendResetEmail({ _id: user.id.toString(), email: user.email, username: user.username },redirectUrl, res);
      return;
    } 
   
    return res.json({
      success: false,
      message: "Email does not exist",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return  res.json({
      success: false, 
      message: "Something went wrong",
    });
  }
};


const sendResetEmail = async (
  { _id, email, username }: { _id: string; email: string; username: string },
  redirectUrl: string,
  res: Response
): Promise<void> => {
  const resetString = uuidv4() + _id;

  try {
    await PasswordReset.deleteMany({ userId:_id });

    const hashedResetString = await bcrypt.hash(resetString, 10);

    const newPasswordReset = new PasswordReset({
      userId: _id,
      resetString: hashedResetString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    await newPasswordReset.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: `
        Hello ${username},
        <br/><br/>
        Please click on the link below to reset your password.
        <br/><br/>
        <a href="${redirectUrl}/${_id}/${resetString}">Reset Password</a>
        <br/><br/>
        The link will expire in 1 hour.
        <br/><br/>
        If you did not request this, please ignore this email.
        <br/><br/>
        Thank you.
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Password reset email sent successfully, please check your email",
    });
  } catch (error) {
    console.error("Error in sendResetEmail:", error);
    res.json({
      success: false,
      message: "An error occurred while sending the password reset email",
    });
  }
};

 const updatePassword = async (req: Request, res: Response) => {
  const { userId, resetString } = req.params;
  const { newPassword } = req.body;

  try {
    const resetRecords = await PasswordReset.find({ userId });

    if (resetRecords.length === 0) {
      return res.json({
        success: false,
        message: "Password link either doesn't exist or has expired.",
      });
    }

    const { expiresAt, resetString: hashedResetString } = resetRecords[0];

    if (expiresAt.getTime() < Date.now()) {
      await PasswordReset.deleteOne({ userId });
      return res.json({
        success: false,
        message: "Password reset link has expired",
      });
    }

    const isMatch = await bcrypt.compare(resetString, hashedResetString);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password reset details passed.",
      });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.updateOne({ _id: userId }, { password: hashedNewPassword });
    await PasswordReset.deleteOne({ userId });

    res.json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Error in updatePassword:", error);
    res.json({
      success: false,
      message: "An error occurred while resetting the password",
    });
  }
};

 export  {createUser,loginUser,userData, resetPassword, updatePassword };