import { Request, Response } from "express";
import Document from "../model/document"; 



const defaultData = "";
 const findOrCreateDocument = async({ id,documentName }: { id: string, documentName:string }) => {
 if(id == null ) return ;
 const document= await Document.findById(id);
  if(document) return document;
  const newDocument= await Document.create({_id: id,  name: documentName, data: defaultData})
  await newDocument.save();
  return newDocument;
}



 const getAllDocs = async (req: Request, res: Response): Promise<Response> => {
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


export { getAllDocs ,findOrCreateDocument};