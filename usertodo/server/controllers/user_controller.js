import {user_collection} from "../models/user_model.js"
import { generateToken } from "../utils/token.js";

export const signupUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const userdata = await user_collection.findOne({username});
        if (userdata) {
            throw new Error("user already presend in DB")
        }
        const data = new user_collection({username, password});
        await data.save();
        res.status(200).json({message:"user created", username});
    } catch(err) {
        res.status(400).json({error:err.message})
    }
}

export const signinUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const userdata = await user_collection.findOne({username, password});
        if (!userdata) {
            throw new Error("User not found")
        }
        
        const token = generateToken(userdata._id);
        res.status(200).json({message:"user signed in", token});
    } catch(err) {
        res.status(400).json({error:err.message})
    }
}