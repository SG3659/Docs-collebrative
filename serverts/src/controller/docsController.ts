import { Request, Response } from "express";
import Document from "../model/document"; 



const defaultData = "";
 const findOrCreateDocument = async({ id,name }: { id: string, name:string }) => {
 if(id == null ) return ;
 const document= await Document.findById(id);
  if(document) return document;
  const newDocument= await Document.create({_id: id,  name: name, data: defaultData})
  await newDocument.save();
  return newDocument;
}



 const getAllDocs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body
        const Docs = await Document.find({ userId });

    // If there is a search query, filter documents by name
    const filterDocs = req.query.search 
      ? Docs.filter((item: { name: string }) => item.name.includes(req.query.search as string))
      : Docs;

    // Send successful response with documents
      return res.json({
        success: true,
        data: filterDocs,
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