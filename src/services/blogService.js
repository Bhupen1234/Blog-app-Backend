const Blog = require("../models/Blog");
const User = require("../models/User");

const postBlog = async (blog,email)=>{

    try {
        const {description,userPicturePath} = blog;

    const user = await User.findOne({email});

    if(!user){
        throw new Error("User not found");
    }

    const blog = new Blog({
    userId : user._id,
    username : user.username,
    description :description,
    userPicturePath: userPicturePath,
    comments :[]
    })


        await blog.save();

    const blogs = await Blog.find({});

    return blogs;
    } catch (error) {
        
    }
    




}



const updateBlog =async(id,blog,email)=>{
   try {
    const {description,picturePath} = blog;
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User not found");
    }

    const updatedBlogData = {
        userId : user._id,
        username : user.username,
        description :description,
        userPicturePath: picturePath,
        comments :[]
    }

    const updatedBlog = await Blog.findOneAndUpdate({_id:id},{$set:updatedBlogData},{new:true});

    return updatedBlog;
   } catch (error) {
       throw error;
   }
}

const getAllBlogs = async ()=>{
    try {
        const allBlogs =   await Blog.find({});
        if(allBlogs.length===0){
            throw new Error("No blogs found");
        }
        return allBlogs
    } catch (error) {
         throw error;
    }
}



const deleteBlog = async (id,email)=>{
    try {
        const blog = await Blog.findOneAndDelete({_id:id,email:email});

        return blog;
    } catch (error) {
        throw error;
    }
}


const updateComment = async (id,email,comments)=>{
    try {
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id,{comments:[comments]},{new:true})

        return updatedBlog;

    } catch (error) {
       throw error; 
    }  
}


module.exports = {postBlog,updateBlog,getAllBlogs,deleteBlog,updateComment};
