import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
const app = express();
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bodyparser from 'body-parser';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import path from 'path';
import multer from 'multer';
import authenticateToken from './middleware/authenticateToken.js';
import {postBlog,updateBlog} from './controllers/blogController.js';

dotenvConfig({path:'src/.env'});
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT|| 5000;




app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy :"cross-origin"}))
app.use(bodyparser.json({limit:"30mb",extended :true}));
app.use(bodyparser.urlencoded({limit:"30mb",extended: true}))
app.use(cors())
app.use("/assets",express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),"../public/assets")));

//File Storage

const  storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"../public/assets/")
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage})

//Routes with files
app.post("/api/blogs/",authenticateToken,upload.single("picture"),blogController.postBlog);
app.put("/api/blogs/:id",authenticateToken,upload.single("picture"),blogController.updateBlog);

//Routes
app.use("/api/users",authRoutes);
app.use("/api/blogs",blogRoutes);

mongoose.connect(MONGODB_URI).then(()=>console.log("Connected to MongoDB")).catch((err)=>console.log(err));

app.get('/',(req,res)=>{
    console.log("Backend Server is running")
})

app.listen(PORT,()=>{
   console.log("Server running on Port 5000")
})

