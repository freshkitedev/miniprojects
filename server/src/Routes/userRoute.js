import exp from "express"
import {signupUser, loginUser } from "../Controller/userController.js";
const router = exp.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);

export default router;