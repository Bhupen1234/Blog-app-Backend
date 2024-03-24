import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser =async(userData)=>{
    try {

        const existingUser = await User.findOne({"email":userData.email});
        if(existingUser){
            throw new Error("User already exists");
        }
        const user = new User(userData);
        const salt = await bcrypt.genSalt();    
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        await user.save();
        return user;
    } catch (error) {
        throw error
    }
}


export const loginUser =async(userData)=>{
    try {
        let {email,password} = userData;

        const user = await User.findOne({email});
         
        if(!user){
            throw new Error("User not found");
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            throw new Error("Invalid password or Username ");
        }


        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET);
        
        return {token, "userId": user._id,"username":user.username}

    } catch (error) {
        throw error;
    }
}

