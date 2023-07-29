import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
 
 export  const generateToken = (userId)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {time: Date(),userId: userId}
    const token = jwt.sign(data, jwtSecretKey);
    return token
 }
