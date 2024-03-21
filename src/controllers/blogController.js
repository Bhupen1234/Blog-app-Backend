const blogService = require("../services/blogService");



export const postBlog = async(req,res)=>{
    try {
     const blogs = await blogService.postBlog(req.body,req.user.email);
     res.status(201).json(blogs);
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
     
}


export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) { 
        res.status(500).json({message:error.message})
    }
}

export const updateBlog = async (req,res)=>{
    try {
        const {id}= req.params;
        
        await blogService.updateBlog(id,req.body,req.user.email);
        res.status(200).json({message:"Blog Updated"});
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const deleteBlog= async (req,res)=>{
    try {
        const {id} = req.params;
        await blogService.deleteBlog(id,req.user.email);

        res.status(200).json({message:"Blog Deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const updateComment = async (req,res)=>{
    try {
        const {id} = req.params;
        const {comment} = req.body
        const updatedBlog = blogService.updateComment(id,req.user.email,comment);
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


