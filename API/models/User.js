const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{type:String, required:true,unique:true ,min:4},
    password:{type:String,required:true}
})
const userModel=mongoose.model("user",userSchema)

module.exports =userModel;
