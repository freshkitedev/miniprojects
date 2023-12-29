import mon from "mongoose";
import Adminmodel from "../Model/adminModel.js";
import jwt from "jsonwebtoken";
const SECRET_KEY = "SecCourseSellapp";

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

export default signupAdmin;
