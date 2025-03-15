// import { uploadOnCloud } from "../utils/cloudnary.util.js";
import { response_success } from "../utils/response.utils.js";
import bcrypt from 'bcrypt';
import fs from 'fs';
import csvParser from 'csv-parser';
import { candidateProfileModel } from "../models/candidateProfile.model.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { recruiterModel } from "../models/recruiterProfile.js";
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
          recruiterId: row.recruiterId,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000),
        });
      }).on("end", async () => {

        for (const candidate of candidates) {
          const emailExist = await candidateProfileModel.findOne({ email: candidate.email });
          if (emailExist) {
            continue;
          }

          await candidateProfileModel.create(candidate)
        }

        // fs.unlink(csvFilePath, (err) => {
        //   if (err) console.error("Error deleting CSV file:", err);
        // })

        return response_success(res, 200, true, 'insertion succesfully', candidates)
      })

  } catch (error) {
    return response_success(res, 500, false, "error in candidate profile api", null)
  }


};

//create candidate profile manually 
const createCandidateManully = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, skills, recruiterId, password } = req.body;

    //if recruiter id is not present then return error 
    if (!recruiterId) {
      return response_success(res, 400, false, "recruiter id is required", null)
    }


    const recruiterIdObject = new mongoose.Types.ObjectId(`${recruiterId}`);


    // if recruiter id is not present in recuirter model then return error
    const recruiterIdCheck = await recruiterModel.findOne({ _id: recruiterIdObject });

    if (!recruiterIdCheck) {
      return response_success(res, 400, false, "recruiter id is not present in db", null)
    }

    if (req.refreshVerification.payload.role != 'a') {

      return response_success(res, 400, false, 'you are not able to use this endpoint please contact admistrator', null)
    }

    if (!email) {
      return response_success(res, 400, false, "email is required", null)
    }

    const emailExist = await candidateProfileModel.findOne({ email: email });
    if (emailExist) {
      return response_success(res, 400, false, "user is alreay created email must be unique", null)
    }

    //conversion of passworde into hash password
    const hashedPasswiod = await bcrypt.hash(password, 10);

    const candidateCreate = await candidateProfileModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      skills,
      recruiterDetails: [{
        recruiterId: recruiterIdObject,
      }],
      password: hashedPasswiod,
      resumeUpload: `${process.env.uploadPathLocal}/${req.file.path}`
    })

    return response_success(res, 200, "candidate created successfully", candidateCreate)

  } catch (error) {
    return response_success(res, 500, false, "catch error in create canidate profile manually", error.message)
  }
}


//get all candidate 
const getCandidate = async (req, res) => {
  console.log("refresh verifcation", req.refreshVerification.payload.email)
  console.log('all candidates')

  const role = req.refreshVerification.payload.role;
  const recruiterId = req.refreshVerification.payload._id;
  const candidate_body_id = req.body.candidateId;
  const recruiter_body_Id = req.body.recruiterId;

  try {

    if (candidate_body_id && recruiter_body_Id) {
      return response_success(res, 400, false, 'please provide either candidate id or recruiter id not both', null)
    }


    //if role ios admin then display all candidates 
    if (role == 'a') {

      // if recruiter id there in body fetch the particular candidates of the recruiter
      if (recruiter_body_Id) {

        console.log(recruiter_body_Id)
        const candidates = await candidateProfileModel.find({
          "recruiterDetails.recruiterId": recruiter_body_Id
        }).populate("recruiterDetails.recruiterId");
        console.log("candidtae", candidates)
        if (!candidates) {
          return response_success(res, 400, false, "there is no candidate in db assosiate with this recruiter id", null)
        }
        return response_success(res, 200, true, "candidates corresponding to this recruiter", candidates)
      }

      //individual canididate 
      if (candidate_body_id) {

        console.log(candidate_body_id)
        const candidates = await candidateProfileModel.findOne({
          _id: candidate_body_id
        }).populate("recruiterDetails.recruiterId");
        console.log("candidtae", candidates)
        if (!candidates) {
          return response_success(res, 400, false, "there is no candidate in db assosiate with this recruiter id", null)
        }
        return response_success(res, 200, true, "candidates corresponding to this recruiter", candidates)
      }

      const candidates = await candidateProfileModel.find().populate("recruiterDetails.recruiterId");
      if (!candidates) {
        return response_success(res, 400, false, "there is no candidate in db", null)
      }
      return response_success(res, 200, true, "all candidates", candidates)
    }

    // if recruiter is send through token
    if (recruiterId) {
      //get individual candiidate for the recruiter
      if (candidate_body_id) {
        const candidates = await candidateProfileModel.findOne({ _id: candidate_body_id, "recruiterDetails.recruiterId": recruiterId }).populate("recruiterDetails.recruiterId");
        if (!candidates) {
          return response_success(res, 400, false, "there is no candidate assosiate with this recruiter", null)
        }
        return response_success(res, 200, true, "caniddate related to this recruiter id ", candidates)
      }

      const candidates = await candidateProfileModel.find({ "recruiterDetails.recruiterId": recruiterId }).populate("recruiterDetails.recruiterId");
      if (!candidates) {
        return response_success(res, 400, false, "there is no candidate assosiate with this recruiter", null)
      }

      return response_success(res, 200, true, "caniddate related to this recruiter id ", candidates)
    }

  } catch (error) {
    return response_success(res, 500, false, "there is some error in catch api of get all candidatre", error.message)
  }
}



//update individual candidate
const updateCandidate = async (req, res) => {
  try {
    const { _id, recruiterId, ...updatedData } = req.body;
    const recruiter_id_json = req.refreshVerification.payload._id;

    if (req.refreshVerification.payload.role == 'c') {

      return response_success(res, 400, false, 'you are not able to use this endpoint please contact admistrator', null)
    }

    if(!_id){
       return response_success(res, 400, false, 'please provide candidate id in body', null)
    }

    //if recruiter comes dont able to change th recruiter id 
    if (req.refreshVerification.payload.role == 'r' && recruiterId) {
      return response_success(res, 400, false, 'you are not able to use this endpoint please contact admistrator recruiter not able to update the recruiter id ', null)
    }

    // if recruiter login then he is able to update the candidate id
    if (req.refreshVerification.payload.role == 'r') {

        const candidate = await candidateProfileModel.findOne({ _id: _id });
  
        const recruiter_id_check = await candidate.recruiterDetails.some((r) => r.recruiterId == recruiter_id_json);
        if (!recruiter_id_check) {
          return response_success(res, 400, false, 'you are not able to update this candidate because you are not the recruiter of this candidate contact admin or specific recruiter', null);
        }

        const updatedCandidated = await candidateProfileModel.findByIdAndUpdate({ _id: _id }, { $set: updatedData }, { new: true }).populate("recruiterDetails.recruiterId");
        
        return response_success(res, 200, "user updated succesfully", updatedCandidated)
    }

    // if recruiter id is assosiate with the candidate then no need to update the data again  case of admin
    if (recruiterId) {
      console.log("recruiter id", recruiterId)
      const candidate = await candidateProfileModel.findOne({ _id: _id });
      const recruiter_id_check = await candidate.recruiterDetails.some((r) => r.recruiterId.toString() == recruiterId.toString());
      console.log("recruiter id check", recruiter_id_check)
      if (recruiter_id_check) {
        return response_success(res, 400, false, 'recruiter id already there please use diffent recruiter id to update this oherwise update other thing', null);
      }

      //otherwise push the recruiter id in the array
      candidate.recruiterDetails.push({
        recruiterId: recruiterId
      })

      candidate.save();
    }

    const updatedCandidated = await candidateProfileModel.findByIdAndUpdate({ _id: _id }, { $set: updatedData }, { new: true }).populate("recruiterDetails.recruiterId");
    return response_success(res, 200, "user updated succesfully", updatedCandidated)

  } catch (error) {
    return response_success(res, 500, false, "there is some catch error in update api of candidate", error.message)
  }
}

//delete individual candidate
const deleteCandidate = async (req, res) => {

  try {
    const candidateId = req.params.id;

    if (req.refreshVerification.payload.role != 'a') {

      return response_success(res, 400, false, 'you are not able to use this endpoint please contact admistrator', null)
    }

    if (!candidateId) {
      return response_success(res, 400, false, 'please provide candidate id in params', null);
    }
    const candidateIdObject = new mongoose.Types.ObjectId(`${candidateId}`);

    //check if this candidate is present or not
    const candidate = await candidateProfileModel.findByIdAndDelete(candidateIdObject)
    return response_success(res, 200, true, "delete sucessfully", candidate)
  } catch (error) {
    return response_success(res, 500, false, 'catch error in delete api', error.message)
  }

}



export { createCandidateProfile, createCandidateManully, getCandidate, updateCandidate, deleteCandidate };
