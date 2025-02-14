// import { uploadOnCloud } from "../utils/cloudnary.util.js";
import { response_success } from "../utils/response.utils.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import { candidateProfileModel } from "../models/candidateProfile.model.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

//create candidate profile (upload candidate profile functionality)
const createCandidateProfile = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.files);

  try {
    //resume is needed
    if (!req.files) {
      return response_success(res, 400, false, "csv file  needed", null);
    }
   
    const csvFilePath = req.files.csvFile[0].path;
    const candidates = [];
  
    fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      candidates.push({
        firstName: row.firstName.trim() || "", // Default to empty string if undefined
        lastName: row.lastName.trim() || "",
        email: row.email ? row.email.trim() : "",  // Avoid undefined error
        phoneNumber: row.phoneNumber ? Number(row.phoneNumber) : null,
        skills: row.skills ? row.skills.trim().split("|").join(", ") : "", 
        // status: row.status ? row.status.trim() : "Inactive", // Default status
        recruiterId:row.recruiterId,
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      });
    }).on("end",async()=>{
       
      for(const candidate of candidates){
         const emailExist = await candidateProfileModel.findOne({email:candidate.email});
         if(emailExist){
            continue;
         }

         await candidateProfileModel.create(candidate)
      }

      // fs.unlink(csvFilePath, (err) => {
      //   if (err) console.error("Error deleting CSV file:", err);
      // })

      return response_success(res,200,true,'insertion succesfully',candidates)
    })
  
  } catch (error) {
    return response_success(res,500,false,"error in candidate profile api",null)
  }


};

//create candidate profile manually 
const createCandidateManully = async(req,res)=>{
   try {
     const {firstName,lastName,email,phoneNumber,skills,recruiterId,role} = req.body;
     console.log(req.file.path);
     console.log()
     if(req.refreshVerification.payload.role!='a' && req.refreshVerification.payload.role!='r'){
          
      return response_success(res,400,false,'you are not able to use this endpoint please contact admistrator',null)
    }
     
     if(!email){
       return response_success(res,400,false,"email is required",null)
     }
     
     const emailExist = await candidateProfileModel.findOne({email:email});
     if(emailExist){
       return response_success(res,400,false,"user is alreay created email must be unique",null)
     }

     const candidateCreate  = await candidateProfileModel.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        skills,
        recruiterId,
        resumeUpload:`${process.env.uploadPathLocal}/${req.file.path}`,
        role:role
     })

     return response_success(res,200,"candidate created successfully",candidateCreate)

   } catch (error) {
      return response_success(res,500,false,"catch error in create canidate profile manually",error.message)
   }
}


//get all candidate 
const getCandidate = async(req,res)=>{
  console.log("refresh verifcation",req.refreshVerification.payload.email)
  console.log('all candidates')

  try {
    
    if(req.refreshVerification.payload.role!='a'){
          
      return response_success(res,400,false,'you are not able to use this endpoint please contact admistrator',null)
    }

    const candidates = await candidateProfileModel.find();
    return response_success(res,200,true,"all candidates",candidates)
     
  } catch (error) {
     return response_success(res,500,false,"there is some error in catch api of get all candidatre",error.message)
  }
}


//get individual candidate
const getIndCandidate = async(req,res)=>{

try {

      const candidateId = new mongoose.Types.ObjectId(`${req.params.id}`);
      
      if(req.refreshVerification.payload.role!='a'){
          
        return response_success(res,400,false,'you are not able to use this endpoint please contact admistrator',null)
      }

      if(!candidateId){
        return response_success(res,400,false,"please send canidateid in params",null)
      }
  
      //check in db if this id is present or not 
      const candidate = await candidateProfileModel.findOne({_id:candidateId});
      if(!candidate){
        return response_success(res,400,'there is not candidate assosisate with this id ',null)
      }

      return response_success(res,200,'candidate found succesfully',candidate)

      
} catch (error) {
   return response_success(res,500,false,"error in catch api of get individual api",error.message)
}


}

//update individual candidate
const updateCandidate = async(req,res)=>{
  try {
     const {_id,...updatedData} = req.body;
     
     if(req.refreshVerification.payload.role!='a' && req.refreshVerification.payload.role!='r'){
          
      return response_success(res,400,false,'you are not able to use this endpoint please contact admistrator',null)
    }


     if(!_id){
      return response_success(res,400,false,'candidate id must needed',null)
     }

     const candidateId = new mongoose.Types.ObjectId(`${_id}`)

     const candidate = await candidateProfileModel.findOne({_id:candidateId});

     if(!candidate){
         return response_success(res,400,false,'there is no candidate assosiate with this id whom you updated',null)
     }

     const updatedCandidated = await candidateProfileModel.findByIdAndUpdate({_id:candidateId},{$set:updatedData},{new:true});
     return response_success(res,200,"user updated succesfully",updatedCandidated)

  } catch (error) {
     return response_success(res,500,false,"there is some catch error in update api of candidate",error.message)
  }
}

//delete individual candidate
const deleteCandidate = async(req,res)=>{
   
try {
     const candidateId = req.params.id;

     if(req.refreshVerification.payload.role!='a'){
          
      return response_success(res,400,false,'you are not able to use this endpoint please contact admistrator',null)
    }

     if(!candidateId){
        return response_success(res,400,false,'please provide candidate id in params',null);
     }
     const candidateIdObject = new mongoose.Types.ObjectId(`${candidateId}`);

     //check if this candidate is present or not
     const candidate = await candidateProfileModel.findByIdAndDelete(candidateIdObject)
     return response_success(res,200,true,"delete sucessfully",candidate)
} catch (error) {
  return response_success(res,500,false,'catch error in delete api',error.message)
}

}



export { createCandidateProfile,createCandidateManully,getCandidate,getIndCandidate,updateCandidate ,deleteCandidate};
