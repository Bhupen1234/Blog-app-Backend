import {registerUser,loginUser} from '../services/authService.js';


export const register = async(req,res)=>{
    try {
        const userData = req.body;
        const user = await registerUser(userData);
        res.status(201).json({
            message: "User Created Successfully",
            userId : user._id
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const login =async (req, res)=>{
    try {
        const userData = req.body;
        const {token,userId} = await loginUser(userData);

        res.status(200).json({
            token,
            userId
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

