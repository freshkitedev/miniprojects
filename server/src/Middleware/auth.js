import jwt from "jsonwebtoken"
export const SECRET_KEY = "SecCourseSellapp";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, value) => {
    if (err) {
      res.status(401).json({message:"Invalid token"})
    } else {
      console.log("Valid User:", value);
      if (value.role === "Admin") {
        console.log("Valid Admin:", value);
        req.admin = value.username;
      } else if (value.role === "User") {
        console.log("Valid User:", value);
        req.user = value.username;
      } else {
        res.status(401).json({message:"Invalid user"});
        return;
      }
      next();
    }
  });
};
