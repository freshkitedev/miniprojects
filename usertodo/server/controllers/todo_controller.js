import { addTodoToDB, deleteTodoFromDB, getTodoFromDB, updateTodoInDB } from "../services/todo_service.js";

export const addTodo = async (req, res) => {
    try {
        const data = await addTodoToDB(req.userId, req.body.tit, req.body.des);
        res.status(200).json({message:"Todo added successfully", data});
    }catch(err) {
        res.status(400).json(err);
    }
}

export const getTodo = async (req, res) => {
    try {
        const data = await getTodoFromDB(req.userId);
        res.status(200).json({message:"Todo got successfully", data});
    }catch(err) {
        res.status(400).json(err);
    }
}

export const updateTodo = async (req, res) => {
    try {
        const data = await updateTodoInDB(req.userId, req.params.id, req.body.tit, req.body.des);
        res.status(200).json({message:"Todo updated successfully", data});
    }catch(err) {
        res.status(400).json({error:err.message});
    }
}

export const deleteTodo = async (req, res) => {
    try {
        await deleteTodoFromDB(req.userId, req.params.id);
        res.status(200).json({message:"Todo deleted successfully"});
    }catch(err) {
        res.status(400).json({error:err.message});
    }
}
