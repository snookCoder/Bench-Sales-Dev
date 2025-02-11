// import { uploadOnCloud } from "../utils/cloudnary.util.js";
import { response_success } from "../utils/response.utils.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import { candidateProfileModel } from "../models/candidateProfile.model.js";

//create candidate profile
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
        firstName: row.firstName.trim(),
        lastName: row.lastName.trim(),
        email: row.email.trim(),
        phoneNumber: Number(row.phoneNumber),
        skills: row.skills.trim().split("|").join(", "), // Convert skills
        status: row.status.trim(),
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      });
    }).on("end",async()=>{
        const insertedCandidates = await candidateProfileModel.insertMany(
        candidates
      );

      fs.unlink(csvFilePath, (err) => {
        if (err) console.error("Error deleting CSV file:", err);
      })

      return response_success(res,200,true,'insertion succesfully',insertedCandidates)
    })
  
  } catch (error) {
    return response_success(res,500,false,"error in candidate profile api",null)
  }


};

export { createCandidateProfile };
