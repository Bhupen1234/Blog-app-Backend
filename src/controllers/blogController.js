
import {postBlogService,getAllBlogsService,updateBlogService,deleteBlogService,updateCommentService} from "../services/blogService.js"

export const postBlog = async (req,res) =>{
    try {

        console.log(req.user)
     const blogs = await postBlogService(req.body,req.user.id);
     res.status(201).json(blogs);
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
     
}


export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await getAllBlogsService();
        res.status(200).json(blogs);
    } catch (error) { 
        res.status(500).json({message:error.message})
    }
}

export const updateBlog = async (req,res)=>{
    try {
        const {id}= req.params;
        
        await updateBlogService(id,req.body,req.user.id);
        res.status(200).json({message:"Blog Updated"});
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const deleteBlog= async (req,res)=>{
    try {
        const {id} = req.params;
        await deleteBlogService(id,req.user.id);

        res.status(200).json({message:"Blog Deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const updateComment = async (req,res)=>{
    try {
        const {id} = req.params;
        const {comment} = req.body
        const updatedBlog = await updateCommentService(id,req.user.id,comment);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


