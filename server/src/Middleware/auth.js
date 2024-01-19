import jwt from "jsonwebtoken"
export const SECRET_KEY = "SecCourseSellapp";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, SECRET_KEY, (err, value) => {
      if (err) {
        res.status(401).json({message:"Invalid token"})
      } else {
        if (value.role == "admin") {
          req.user = value.username;
          next();
        } else {
          res.status(401).json({message:"Invalid user"})
        }
      }
    })
  }
  