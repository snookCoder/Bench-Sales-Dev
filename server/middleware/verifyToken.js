import { response_success } from "../utils/response.utils.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

const verifyToken = async(req,res,next)=>{

try {
         const authHeader = req.headers["authorization"];
    
         if(!authHeader || !authHeader.startsWith("Bearer ")){
           return response_success(res,400,false,"auth header needed",null)
         }

         const token = authHeader.split(" ")[1];

         if(!token){
            return response_success(res,404,false,"token is not provided or token expired",null)
         }
         const decode = jwt.decode(token);
         const secretKey = decode.type =="refreshToken"?process.env.REFRESH_TOKEN:process.env.ACCESS_TOKEN
        //  console.log(secretKey)
         const refreshVerification = await jwt.verify(token,secretKey);
         req.refreshVerification = refreshVerification;
         next();

} catch (error) {
    const statusCode = error.message.includes("jwt expired") ? 404 : 500;

    return response_success(
        res,
        statusCode,
        false,
        statusCode === 404 
            ? "Authorization error, token may be invalid or expired" 
            : "Error in catch of verify token middleware, may be  token expired",
        error.message
    );
}

     
}


export{verifyToken}