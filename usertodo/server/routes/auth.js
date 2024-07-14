import exp from "express"
import { signinUser, signupUser } from "../controllers/user_controller.js";

const router = exp.Router();

router.post("/signup", signupUser )
router.post("/signin", signinUser)

export default router;

