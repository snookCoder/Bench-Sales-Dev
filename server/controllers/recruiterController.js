import { recruiterModel } from "../models/recruiterProfile.js"
import { response_success } from "../utils/response.utils.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookie from 'cookie'
import { candidateProfileModel } from "../models/candidateProfile.model.js";
import { generateToken } from "../utils/generateToken.js";
dotenv.config();


//create the recruiter  profile
const recruiterDetails = async(req,res)=>{
  
    try {

        const {firstName,lastName,email,gender,username,password} = req.body

        if(!email){
            return response_success(res,400,false,'email is required',null)
        }
  
        //check if email exist or not 
        const emailExist = await recruiterModel.findOne({email});

        if(emailExist){
            return response_success(res,400,false,'email already exist',null)
        }
         
        const hashedPassword = await  bcrypt.hash(password,10);
        const createRecruiter = await recruiterModel.create({
            firstName,
            lastName,
            email,
            gender,
            username,
            password:hashedPassword
        })
        
      return response_success(res,200,true,'recruiter profile created',createRecruiter)

    } catch (error) {
        return response_success(res,500,false,'error in catch api',error.message)
    }
}

//login the recruiter
const recruiterLogin = async(req,res)=>{
   try {
    
     const {email,password} = req.body;

     //email not entered
     if(!email){
        return response_success(res,400,false,'email is required',null);

     }

     //password not enter
     if(!password){
        return response_success(res,400,false,"password is req.",null);
     }

     //if email exist or not if not please signup first
     const recruiter = await recruiterModel.findOne({email});
     if(!recruiter){
        return response_success(res,400,false,'recruiter is not exist of this email  signup first',null)
     }

     const hashPass = recruiter.password;
     const comparePass = await bcrypt.compare(password,hashPass);
     if(!comparePass){
        return response_success(res,400,false,'password not match',null)
     }
     
     const jwtPayload = {_id:recruiter._id,email:recruiter.email}
     
    const tokens = generateToken(jwtPayload);
    console.log("tokens",tokens)
      recruiter.refreshToken = {
         token:tokens.refreshToken,
         expiryDate: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
     } 
 
        // Set cookies with new tokens
        res.cookie("REFRESH_TOKEN",tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
          });
          res.cookie("ACCESS_TOKEN",tokens.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 20 * 60 * 1000,
            sameSite: "Strict",
          });

     await recruiter.save();


     return response_success(res,200,true,'user login successfuly',{"tokens":tokens,recruiter})

   } catch (error) {
      response_success(res,500,false,'catch error in recruiter login',error.message)
   }
}

//refresh Token api

const refresh = async(req,res)=>{
 
    try {


       
        const recruiter = await recruiterModel.findOne({email:req.refreshVerification.payload.email});
        const payload = {_id:recruiter._id,email:recruiter.email};

        const tokens = generateToken(payload);

        recruiter.refreshToken = {
            token:tokens.refreshToken
        }
        recruiter.save();

           // Set cookies with new tokens
           res.cookie("REFRESH_TOKEN",tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
          });
          res.cookie("ACCESS_TOKEN",tokens.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 20 * 60 * 1000,
            sameSite: "Strict",
          });
        return response_success(res,200,true,"token regenrate succesfully",tokens)
        

    } catch (error) {
        return response_success(res,500,false,"error in catch api of refresh",error.message)
    }
}


export {recruiterDetails,recruiterLogin,refresh}