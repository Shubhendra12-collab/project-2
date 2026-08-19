import express, { Request } from 'express';
import { register,loginUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { loginValidator } from '../validation/auth.validator';
 import multer from "multer";
 import fs from "fs";

 const folder = "uploads/";

 //* create upload folder is not exists
 if(!fs.existsSync(folder)){
    fs.mkdirSync(folder);
 }

// const upload = multer({  Storage: });

//*multer disk storage
const storage = multer.diskStorage({
    destination:(req: Request, file: Express.Multer.File, callback) =>{
        callback(null, folder);
    },
    filename:(req: Request, file: Express.Multer.File, callback) =>{
        const fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
    },
});

//* multer upload instance
const upload = multer({ 
    storage:storage,
 });

const router = express.Router();

//* register user
router.post('/register', upload.single('profile_image'),register);

//* login
router.post('/login',validate(loginValidator), loginUser);

//* change password

//* change profile image

export default router;
