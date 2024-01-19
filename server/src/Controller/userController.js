import mon from "mongoose";
import Usermodel from "../Model/userModel.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "SecCourseSellapp";

export const signupUser = (req, res) => {

    const data = { username: req.body.username, password: req.body.password };
    const {username, password} = req.body;
    const msg = "User created";
  
    function createUser(user) {
      if (user) {
        res.status(403).json({ message: "User already exists" });
      } else {
        const token = jwt.sign({ username, role: "user" }, SECRET_KEY, {
          expiresIn: "1h",
        });
        const userData = new Usermodel(data);
        userData.save();
  
        res.status(200).json({ message: msg, token });
      }
    }
    Usermodel.findOne({ username }).then(createUser);
  };

export const loginUser = (req, res) => {
    const {username, password} = req.body;

    function loginUser(user) {
        if (!user) {
            res.status(403).json({message:" User doesn't exist"});
            return;
        }
        
        const token  = jwt.sign({username, role:"User"}, SECRET_KEY, {expiresIn:'1h'});
        res.status(200).json({message:"User logged in Succesfully", token});
    }
    Usermodel.findOne({username}).then(loginUser);
}

