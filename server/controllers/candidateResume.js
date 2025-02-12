import { candidateProfileModel } from "../models/candidateProfile.model.js";
import { response_success } from "../utils/response.utils.js"
import dotenv from 'dotenv'
dotenv.config();

const local = process.env.uploadPathLocal;
const production = process.env.uploadPathProd;

const candidateResume = async(req,res)=>{
   
try {
      const {email}= req.body;
  
      //check if email is laready exist or not 
      if(!email){
        return response_success(res,400,false,"email is needed",null);
      }
  
      if(!req.file){
          return response_success(res,400,false,"req.file is not exist",null);
      }
  
      //check in db if email exist or not in db
      console.log("email",email)
      const candidate = await candidateProfileModel.findOne({email:email});
      console.log("candidate",candidate)
      if(!candidate){
          return response_success(res,400,false,"candidate not exist please add candidate before uploading the resume",null)
      }
  
     const resumePath = `${production}/${req.file.path}`;
     console.log("resumePath",resumePath)
     
     if(candidate.resumeUpload){
       return response_success(res,400,false,'resume thing already updated',null)
     }
     
     candidate.resumeUpload = resumePath;
     candidate.save();
  
     return response_success(res,200,true,"resume field url added",candidate)
      
} catch (error) {
    return response_success(res,500,false,"catch error in resume api",error.message)
}
}


export {candidateResume}