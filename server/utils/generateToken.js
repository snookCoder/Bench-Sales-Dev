import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (payload)=>{
  
        const accessToken = jwt.sign({payload,type:"accessToken"},process.env.ACCESS_TOKEN,{expiresIn:"6m"});
        const refreshToken = jwt.sign({payload,type:"refreshToken"},process.env.REFRESH_TOKEN,{expiresIn:"15d"});

        return {accessToken,refreshToken}
}

export {generateToken}