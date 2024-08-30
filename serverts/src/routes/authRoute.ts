import express,{Request, Response} from"express"
import  {createUser,loginUser,userData} from "../controller/authController"
import ApiRateLimit from "../middleware/loginLimit"
const router =express.Router();
router.post("/register", (req: Request, res: Response) => createUser(req, res));
router.post("/login",ApiRateLimit,(req:Request,res:Response)=>loginUser(req,res))
router.post("/get-user-info-by-id", (req:Request,res:Response)=>userData(req,res));

export default router;