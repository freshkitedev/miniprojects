import mon from "mongoose";
import Adminmodel from "../Model/adminModel.js";
import jwt from "jsonwebtoken";
import { courseModel } from "../Model/courseModel.js";
import { SECRET_KEY } from "../Middleware/auth.js";


const signupAdmin = (req, res) => {
  console.log("Reached route:", req.body);
  const data = { username: req.body.username, password: req.body.password };
  const {username, password} = req.body;
  const msg = "Admin created";

  console.log("Data:", data);
  function createAdmin(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const token = jwt.sign({ username, role: "admin" }, SECRET_KEY, {
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
            res.status(403).json({message:"Admin doesn't exist"});
            return;
        }

        const token  = jwt.sign({username, role:"Admin"}, SECRET_KEY, {expiresIn:'1h'});
        console.log("Admin logged in");
        res.status(200).json({message:"Admin logged in Succesfully", token});
    }
    Adminmodel.findOne({username}).then(loginAdmin);
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
        res.status(200).json({ msg: "Course Added succesfully", courseInfo });
      } catch (err) {
        res.status(400).json({ message: "Error while update course to DB" });
      }
    }
  })
}
export const deletecourse = async (req, res) => {
  const courseInfo = req.params.Title;
  await courseModel.findOneAndDelete(courseInfo).then( async (course) => {
    if (course) {
      res.status(200).json({msg:"course deleted successfully",course})
      console.log("deletecourse:", courseInfo);
    } else {
      res.status(404).json({msg:"No such courses Available"})
    }
  })
}


export default signupAdmin;