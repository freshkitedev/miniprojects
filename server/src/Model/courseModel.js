import mon from "mongoose"

const courseSchema = new mon.Schema({
   Title:{type:String,required:true},
    Description:String,
    Price:Number,
    Imagelink:String,
    Published:Boolean
})

export const courseModel = mon.model("Course", courseSchema)



