import mon from "mongoose"

const adminSchema = new mon.Schema({
    username:{type:String},
    password:String
})
const Adminmodel = mon.model("Admin", adminSchema);

export default Adminmodel;