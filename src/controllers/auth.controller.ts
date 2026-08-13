import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { hashPassword } from '../utils/bcrypt.utils';
import AppError from '../utils/appError.utils';


//*register user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { full_name, email, password, phone_number, profile_image,} = req.body;
       
        if(!full_name){
            // const error : any = new Error("full_name is required");
            // error.statusCode = 400;
            // error.status = "fail";
            // error.success = false;
            throw new AppError("full_name is required", 400);
        }
        if(!email) throw new AppError("email is required", 400);
        
        if(!password) throw new AppError("password is required", 400);
        
        //* user instance
        const user = new User({
            full_name,
            email, 
            phone_number,
            profile_image,
        });
        
        //* hash password
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        
        // if(!password){
        //     const error : any = new Error(
        // "password is required");
        //     error.statusCode = 400;
        //     error.status = "fail";
        //     error.success = false;
        // }

    
        
        //*save user to database
        await user.save();

        //* success response
        res.status(201).json({
            status: "success",
            success: true,
            message: "User registered successfully",
            data:user,
        });
    }catch (error) {
        next(error);
    }
};

//*login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body;

        if(!email) throw new AppError("email is required", 400);

        if(!password) throw new AppError("password is required", 400);
        
        //* find user by email
        const user = await User.findOne({ email });
        
        //* if  !user throw error
        if(!user) throw new AppError("Invalid email or password", 401);
        
        //* compare password with hashed password
        const isMatch = await user.comparePassword(password);
        
        //* if password is not match throw error
        if(!isMatch) throw new AppError("Invalid email or password", 401);
        
        //* success response with user data and token
        const token = await user.generateToken();

        res.status(200).json({
            status: "success",
            success: true,
            message: "User logged in successfully",
            data: user,
            token,
        });

    }catch (error) {
        next(error);
    }
};