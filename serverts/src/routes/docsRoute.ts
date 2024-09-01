import express,{Request, Response} from"express"
import AuthMiddleware from "../middleware/verify"
const router =express.Router();
import {getAllDocs} from"../controller/docsController"
router.get("/getAllDocs", (req: Request, res: Response) => {
   getAllDocs(req, res);
 });
export default router;