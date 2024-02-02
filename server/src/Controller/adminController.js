import mon from "mongoose";
import Adminmodel from "../Model/adminModel.js";
import jwt from "jsonwebtoken";
import { courseModel } from "../Model/courseModel.js";
import { SECRET_KEY } from "../Middleware/auth.js";

const signupAdmin = (req, res) => {
  const data = { username: req.body.username, password: req.body.password };
  const {username, password} = req.body;
  const msg = "Admin created";

  console.log("Admin signup:", data);
  function createAdmin(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin username already exists" });
    } else {
      const token = jwt.sign({ username, role: "Admin" }, SECRET_KEY, {
        expiresIn: "1h",
      });
      const adminData = new Adminmodel(data);
      adminData.save();

      res.status(200).json({ message: msg, token });
    }
  }
  Adminmodel.findOne({ username }).then(createAdmin);
};

export const loginAdmin = (req, res) => {
    const {username, password} = req.body;

    function loginAdmin(admin) {
        if (!admin) {
            res.status(403).json({message:"Invalid username/password"});
            return;
        }

        const token  = jwt.sign({username, role:"Admin"}, SECRET_KEY, {expiresIn:'1h'});
        console.log("Admin logged in:", username);
        res.status(200).json({message:"Admin logged in Succesfully", token});
    }
    Adminmodel.findOne({username, password}).then(loginAdmin);
}

export const addCourse = async (req, res) => {
  const courseInfo = req.body;
  await courseModel.findOne({Title:courseInfo.Title}).then(async (course) => {
    if (course) {
      res.status(403).json({msg:"Course already available choose different title",
        title:courseInfo.Title})
    } else {
      try {
        const courseData = new courseModel(courseInfo);
        await courseData.save();
        console.log("addCourse:", courseInfo);
        res.status(200).json({ msg: "Course Added successfully", courseData });
      } catch (err) {
        res.status(400).json({ message: "Error while update course to DB" });
      }
    }
  })
}

export const updateCourse = async(req,res) =>{
  try{
   const courseInfo = req.body;
   const id = req.params.id;
   const updatedCourse = await courseModel.findOneAndUpdate({_id:id},
     courseInfo, { new: true })
   if(courseModel){
     res.status(200).json({msg:"Updated successfully",updatedCourse})
   }else{
     res.status(404).json({msg: "id not found"});
   }
  }catch (err) {
    res.status(400).json({ message: "Error while update course to DB" });
  }
}

export const getAllCourses = async(req,res)=>{
  try{
    const user = await courseModel.find();
    res.status(200).json({"Courses":user})
  }catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}}

export default signupAdmin;