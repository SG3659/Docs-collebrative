import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


 const verify  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Retrieve the token from request headers
    const token  = req.cookies['access_token'];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Auth failed: No token provided",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, decoded:any ) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Auth failed",
        });
      } else {
        // Decode token payload and assign
        const payload = decoded as JwtPayload; // Cast to JwtPayload to ensure it has a known shape
        req.body.userId = payload.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token key",
    });
  }
};
export default verify