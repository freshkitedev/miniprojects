
import config from "../config/config.js"
import jwt from "jsonwebtoken"
export const generateToken = (userid) =>{
    const token = jwt.sign({userid}, config.jwtSecret,{expiresIn:'1h'});
    return token;
}

export const verifyToken = (token) => {
    try {
        const userId = jwt.verify(token, config.jwtSecret);
        return userId;
    } catch(err) {
        return null;
    }
}