

import mongoose from 'mongoose';

enum Role {
    ADMIN = 'admin',
    USER = 'user',
}



///*interface for user model
interface IUserDocument extends mongoose.Document {
    full_name: string;
    email: string;
    password: string;
    phone_number?: string;
    profile_image?: string;
    role: Role;
}

//*user schema
const userSchema = new mongoose.Schema<IUserDocument>(
    {
    full_name:{
        type:String,
        required:[true,"full_name is required"],
        minlength:[3,"full_name must be at least 3 characters"],
        trim:true,
    },
    email:{
        type:String,
        unique:[true,"user already exists with this email"],
        required:[true,"email is required"], 
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    role:{
        type:String,
        enum:Object.values(Role), // Use Object.values to get the enum values
        default:Role.USER,
    },
    phone_number:{
        type:String,
        default:null,
        trim:true,
    },
    profile_image:{
        type:String,
        default:null,
    },

}, 
{ 
    timestamps: true 
});




//*user model
const User = mongoose.model<IUserDocument>('User', userSchema);
export default User;