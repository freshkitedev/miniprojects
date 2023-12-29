import exp from "express"
import signupAdmin from "../Controller/adminController.js";


const router = exp.Router()

router.post("/signup", signupAdmin);

export default router;
