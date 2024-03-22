import express from 'express';
const router = express.Router();

import {getAllBlogs,deleteBlog,updateComment} from "../controllers/blogController.js";
import authenticateToken from '../middleware/authenticateToken.js';





router.get("/",authenticateToken,getAllBlogs);

router.delete("/:id",authenticateToken,deleteBlog);
router.patch("/:id/comment",authenticateToken,updateComment);

export default router