import { todo_collection } from "../models/todo_model.js";
import { user_collection } from "../models/user_model.js"

const findUserById = async (userId) => {
    try {
        const user = await user_collection.findById(userId);
        return user;
    }catch(err) {
        throw new Error("Userid is not valid");
    }
}

export const addTodoToDB = async (userId, tit, des) => {
    try {
        const user = await findUserById(userId);
        const data = {
            title:tit,
            description: des,
            done:false,
            username:user.username
        }
        const entry = new todo_collection(data);
        await entry.save();
        return data;
    }catch(err) {
        throw new Error("Unable to add todo to DB");
    }
}

export const getTodoFromDB = async (userId) => {
    try {
        const user = await findUserById(userId);
        const data = await todo_collection.find({username:user.username});
        return data;
    }catch(err) {
        throw new Error("Unable to get todo from DB");
    }
}

async function validateUser(userId, todoId) {
    const user = await findUserById(userId);
    const todo = await todo_collection.findById(todoId);
    if (user.username !== todo.username) {
      throw new Error("Invalid user token provided");
    }
}

export const updateTodoInDB = async (userId, todoId, tit, des) => {
    try {
        await validateUser(userId, todoId);
        const data = {
            title:tit,
            description: des,
            done:false,
            username:user.username
        }
        const result = await todo_collection.findByIdAndUpdate(todoId, data, {new:true});
        return result;
    }catch(err) {
        throw new Error(err.message);
    }
}

export const deleteTodoFromDB = async (userId, todoId) => {
    try {
        await validateUser(userId, todoId);
        await todo_collection.findByIdAndDelete(todoId);
    }catch(err) {
        throw new Error(err.message);
    }
}