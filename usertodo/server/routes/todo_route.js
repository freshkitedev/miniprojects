import exp from "express"
import { addTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo_controller.js";
import { authJwtToken } from "../middleware/authUser.js";

export const todo_router = exp.Router();

todo_router.post("/add", authJwtToken, addTodo);
todo_router.get("/get", authJwtToken, getTodo);
todo_router.put("/update/:id", authJwtToken, updateTodo);
todo_router.delete("/del/:id", authJwtToken, deleteTodo);