import mon, { model } from "mongoose"

const user_schema = new mon.Schema({
    username:String,
    password:String
})

export const user_collection = new model("user", user_schema)
