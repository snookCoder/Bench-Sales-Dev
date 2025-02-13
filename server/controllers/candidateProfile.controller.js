// import { uploadOnCloud } from "../utils/cloudnary.util.js";
import { response_success } from "../utils/response.utils.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import { candidateProfileModel } from "../models/candidateProfile.model.js";
import dotenv from 'dotenv';
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
        status: row.status ? row.status.trim() : "Inactive", // Default status
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
     const {firstName,lastName,email,phoneNumber,skills,status,recruiterId} = req.body;
     console.log(req.file.path);
     
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
        status,
        recruiterId,
        resumeUpload:`${process.env.uploadPathLocal}/${req.file.path}`
     })

     return response_success(res,200,"candidate created successfully",candidateCreate)

   } catch (error) {
      return response_success(res,500,false,"catch error in create canidate profile manually",error.message)
   }
}

export { createCandidateProfile,createCandidateManully };
