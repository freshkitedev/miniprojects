import exp from "express"
import {signupUser, loginUser, getCourse, purchaseCourse, purchasedCourses } from "../Controller/userController.js";
const router = exp.Router();
import { verifyToken } from "../Middleware/auth.js";

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/getcourse", getCourse);
router.post("/purchase/:id", verifyToken, purchaseCourse);
router.get("/purchased", verifyToken, purchasedCourses)

export default router;