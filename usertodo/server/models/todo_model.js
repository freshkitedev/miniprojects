import mon, { model } from "mongoose"

const todo_schema = new mon.Schema({
    title:String,
    description:String,
    done:Boolean,
    username:String
})

export const todo_collection = new model("todo", todo_schema)