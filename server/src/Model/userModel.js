import mon from "mongoose"

const UserSchema = new mon.Schema({
    username:{type:String},
    password:String
}) 
const Usermodel = mon.model("User",UserSchema);

export default Usermodel;
