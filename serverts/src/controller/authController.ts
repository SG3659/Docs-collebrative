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
 


 export  {createUser,loginUser,userData };