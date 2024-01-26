import exp from "express"
import signupAdmin, { addCourse, loginAdmin, updateCourse } from "../Controller/adminController.js";
import { verifyToken } from "../Middleware/auth.js";

const router = exp.Router()

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin)
router.post("/addcourse", verifyToken, addCourse)
router.put("/updatecourse/:id", verifyToken, updateCourse)

export default router;
