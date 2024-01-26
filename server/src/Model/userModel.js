import mon from "mongoose"

const UserSchema = new mon.Schema({
    username:{type:String},
    password:String,
    purchasedCourses: [{ type: mon.Schema.Types.ObjectId, ref: 'Course' }]
}) 
const Usermodel = mon.model("User",UserSchema);

export default Usermodel;


