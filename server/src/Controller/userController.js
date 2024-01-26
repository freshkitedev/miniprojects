import Usermodel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../Middleware/auth.js";
import { courseModel } from "../Model/courseModel.js";

export const signupUser = (req, res) => {
  try{
      const data = { username: req.body.username, password: req.body.password };
      const {username, password} = req.body;
      const msg = "User created";

      function createUser(user) {
        if (user) {
          res.status(403).json({ message: "User already exists" });
        } else {
          const token = jwt.sign({ username, role: "User" }, SECRET_KEY, {
            expiresIn: "1h",
          });
          const userData = new Usermodel(data);
          userData.save();
          res.status(200).json({ message: msg, token });
        }
      }
    Usermodel.findOne({ username }).then(createUser);
    }catch (err) {
      res.status(400).json({ message: "Error while update course to DB" });
    }
  };

export const loginUser = (req, res) => {
  try{
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
    }catch (err) {
    res.status(400).json({ message: "Error while update course to DB" });
  }
}

export const getCourse =async (req,res) =>{
  try {
    const courses = await courseModel.find({ Published: true });
    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
}

export const purchaseCourse = async(req,res) =>{
  try{
    const course = await courseModel.findById({_id:req.params.id}); 
    if(course){
       const user = await Usermodel.findOne({username:req.user})
       if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully',purchasedCourses:course});
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
}

export const purchasedCourses = async(req,res)=>{
   try{
      const user = await Usermodel.findOne({username:req.user}).populate("purchasedCourses")  
      res.status(200).json({"purchased_Courses":user})
   }catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } 
}

