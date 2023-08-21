import express from 'express'
import { signup,login, getProfile, updateProfile, changePassword } from '../controllers/userController.js';
import { verifyJwtToken } from '../middlewares/authetication.js';

const userRoutes = express();

userRoutes.post('/signup',signup)

userRoutes.post('/login',login)
userRoutes.get('/getProfile', verifyJwtToken, getProfile)
// userRoutes.get('/getProfile', verifyJwtToken, get)
userRoutes.post('/updateProfile', verifyJwtToken, updateProfile)
userRoutes.post('/changePassword', verifyJwtToken, changePassword)


export default userRoutes