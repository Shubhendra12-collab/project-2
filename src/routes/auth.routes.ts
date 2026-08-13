import express from 'express';
import { registerUser } from '../controllers/auth.controller';

const router = express.Router();

//* register user
router.post('/register', registerUser);

//* login
//router.post('/login', loginUser);

//* change password

//* change profile image

export default router;
