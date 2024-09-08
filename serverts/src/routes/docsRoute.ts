import express,{Request, Response} from"express"
import AuthMiddleware from "../middleware/verify"
const router =express.Router();
import {getAllDocs,deleteDoc} from"../controller/docsController"
router.get("/getAllDocs", (req: Request, res: Response) => {
   getAllDocs(req, res);
 });
router.delete("/delete",(req:Request,res:Response)=>{
  deleteDoc(req,res)
})

export default router;