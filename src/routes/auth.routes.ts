import express from 'express';
import { register,loginUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { loginValidator } from '../validation/auth.validator';


const router = express.Router();

//* register user
router.post('/register', register);

//* login
router.post('/login',validate(loginValidator), loginUser);

//* change password

//* change profile image

export default router;
