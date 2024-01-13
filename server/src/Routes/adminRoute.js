import exp from "express"
import signupAdmin, { addCourse, loginAdmin,getAllCourses } from "../Controller/adminController.js";
import { verifyToken } from "../Middleware/auth.js";

const router = exp.Router()

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin)
router.post("/addcourse",verifyToken, addCourse) 
router.get("/getcourse",getAllCourses)

export default router;
