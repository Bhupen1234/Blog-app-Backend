const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    username :{
        type:String,
        required:true

    },
    
    
   
    description :String,
    userPicturePath : String,
    
    comments :{
        types : Array,
        default :[]
    }

},
{
    timestamps:true
})

const Blog = mongoose.model("Blog",blogSchema);
module.exports = Blog;