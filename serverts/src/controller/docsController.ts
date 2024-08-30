import { Request, Response } from "express";
import Document from "../model/document"; 

export const getAllDocs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;

    // Retrieve documents associated with the user
    const Docs = await Document.find({ userId });

    // Send successful response with documents
    return res.json({
      success: true,
      data: Docs,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);

    // Handle error and send failure response
    return res.json({
      success: false,
      message: "Docs not found",
    });
  }
};
export default getAllDocs;