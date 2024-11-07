const mongoose=require("mongoose")

const mongooseSchema=new mongoose.Schema({
    tittle:String,
    description:String,
    file:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"}


},{
    timestamps:true
})
const PostModel=mongoose.model("Post",mongooseSchema)

module.exports=PostModel