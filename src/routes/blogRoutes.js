const express = require('express');
const router = express.Router();


const blogController = require("../controllers/blogController");
const authenticateToken = require('../middleware/authenticateToken');



router.get("/",authenticateToken,blogController.getAllBlogs);

router.delete("/:id",authenticateToken,blogController.deleteBlog);
router.patch("/:id/comment",authenticateToken,blogController.updateComment);

export default router