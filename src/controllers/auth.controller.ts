import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/bcrypt.utils';
import AppError from '../utils/appError.utils';
import { sendResponse } from '../utils/sendResponse.utils';
import { catchAsync } from '../utils/catchAsync.utils';
import { generateJwtToken } from '../utils/jwt.utils';


//*register user

export const register = catchAsync(async(req,res)=>{
    const { full_name, email, password, phone_number, profile_image,} = req.body;
    const file = req.file;
    console.log(file);   

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
         //*convert user mongoose document to plain object
        const { password: _, ...rest } = user.toObject();

        //* success response
        // res.status(201).json({
        //     status: "success",
        //     success: true,
        //     message: "User registered successfully",
        //     data:rest,
        // });
        sendResponse(res,{
            message:"account created",
            statusCode:201,
            data:rest,
        });

})

//*login user

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body;

        if(!email) throw new AppError("email is required", 400);

        if(!password) throw new AppError("password is required", 400);
        
        //* find user by email
        const user = await User.findOne({ email }).select ("+password");
        
        //* if  !user throw error
        if(!user) throw new AppError("Invalid email or password", 401);
        
        //* compare password with hashed password
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) throw new AppError("Invalid email or password", 401);
        
        //* if password is not match throw error
        // if(!isMatch) throw new AppError("Invalid email or password", 401);
        
        //* success response with user data and token
        //const token = await user.generateToken();
        const access_token = generateJwtToken({
            _id:user._id,
            email:user.email,
            role:user.role,
        });
         //todo: jwt token generation and response
        //*convert user mongoose document to plain object
        const { password: _, ...rest } = user.toObject();

        res.status(200).json({
            status: "success",
            success: true,
            message: "User logged in successfully",
            data: {
                user: rest,
                access_token,
            },
        });

       

        

       
    }catch (error) {
        next(error);
    }
};