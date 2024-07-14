import { verifyToken } from "../utils/token.js";

export const authJwtToken = (req, res, next) => {
    console.log(req.headers);
    const head = req.headers['authorization'];
    if (head) {
      const token = head.split(" ")[1];
      const token_data = verifyToken(token);
      if (token_data) {
        req.userId = token_data.userid;
        next();
        return;
      }
    }
    res.status(400).json("Token verification error");
}