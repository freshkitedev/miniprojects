import exp from "express"
import signupAdmin, { loginAdmin } from "../Controller/adminController.js";


const router = exp.Router()

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin)

export default router;
