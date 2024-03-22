

import mongoose from 'mongoose';

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
    
    
   title :{
    type:String,
    required:true
   },
    description :String,
    userPicturePath : String,
    
    comments :{
        type : Array,
        default :[]
    }

},
{
    timestamps:true
})

const Blog = mongoose.model("Blog",blogSchema);



export default Blog;