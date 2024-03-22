import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    // username, email, and password.

    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },


},

{
    timestamps: true
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};




const User = mongoose.model('User',userSchema);

export default User;