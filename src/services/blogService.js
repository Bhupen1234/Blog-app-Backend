import Blog from "../models/Blog.js";
import User from "../models/User.js";



export const postBlogService = async (blog,userId)=>{

    try {
        const {description,userPicturePath,title} = blog;
     
    const user = await User.findById(userId);

    if(!user){
        throw new Error("User not found");
    }

    const newblog = new Blog({
    userId : user._id,
    username : user.username,
    description :description,
    userPicturePath: userPicturePath,
    title:title,
    comments :[]
    })


        await newblog.save();

    const blogs = await Blog.find({});

    return blogs;
    } catch (error) {
        console.log(error)
        throw error;
    }
    




}



export const updateBlogService =async(id,blog,userId)=>{
   try {
    const {description,userPicturePath,title} = blog;
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }

    const updatedBlogData = {
        userId : user._id,
        username : user.username,
        description :description,
        userPicturePath: userPicturePath,
        title:title
      
    }

    const updatedBlog = await Blog.findOneAndUpdate({_id:id},{$set:updatedBlogData},{new:true});

    return updatedBlog;
   } catch (error) {
       throw error;
   }
}

export const getAllBlogsService = async ()=>{
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



export const deleteBlogService = async (id,userId)=>{
    try {
        const blog = await Blog.findOneAndDelete({_id:id,userId:userId});

        
        if(!blog){
            throw new Error("You cannnot delete a blog ");
        }

        return blog;
    } catch (error) {
        throw error;
    }
}


export const updateCommentService = async (id,userId,comments)=>{
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new Error("User not found");
        }
        const blog = await Blog.findById(id);

         blog.comments.push(comments)

         await blog.save();

        return blog;

    } catch (error) {
       throw error; 
    }  
}



