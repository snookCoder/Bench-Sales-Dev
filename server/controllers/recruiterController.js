import { recruiterModel } from "../models/recruiterProfile.js"
import { response_success } from "../utils/response.utils.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookie from 'cookie'
import { candidateProfileModel } from "../models/candidateProfile.model.js";
import { generateToken } from "../utils/generateToken.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import { upload } from "../utils/multer.js";
import mongoose from "mongoose";
import { ifError } from "assert";
dotenv.config();


//create the recruiter  profile
const recruiterDetails = async (req, res) => {
  console.log("worked")

  try {

    const { firstName, lastName, email, gender, username, password, role } = req.body

    if (!email) {
      return response_success(res, 400, false, 'email is required', null)
    }

    //check if email exist or not 
    const emailExist = await recruiterModel.findOne({ email });

    if (emailExist) {
      return response_success(res, 400, false, 'email already exist', null)
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createRecruiter = await recruiterModel.create({
      firstName,
      lastName,
      email,
      gender,
      username,
      password: hashedPassword,
      role: role
    })

    return response_success(res, 200, true, 'recruiter profile created', createRecruiter)

  } catch (error) {
    return response_success(res, 500, false, 'error in catch api', error.message)
  }
}

//upload csvrecruiter functionaity
const uploadRecruiter = async (req, res) => {

  try {

    //csv upload thing
    const csvFilePath = req.files.csvFile[0].path;
    const recruiters = [];
    console.log(csvFilePath)
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {

        recruiters.push({
          firstName: row.firstName.trim() || "dummy",
          lastName: row.lastName.trim() || 'dummy',
          email: row.email.trim() || "dummy",
          gender: row.gender.trim() || "dummy",
          username: row.username.trim() || "dummy",
          password: row.password.trim() || "dummy"

        })

      }).on("end", async () => {

        for (const recruiter of recruiters) {
          const emailExist = await recruiterModel.findOne({ email: recruiter.email });
          if (emailExist) {
            continue;
          }

          await recruiterModel.create(recruiter)
        }


        fs.unlink(csvFilePath, (err) => {
          if (err) {
            console.log(err)
          }
        })

        return response_success(res, 200, true, "recruiter unniqu insertion succesfully", recruiters)
      })

  } catch (error) {
    return response_success(res, 500, false, 'error in upload recruiter api', error.message)
  }
}

//login the recruiter
const recruiterLogin = async (req, res) => {
  try {


    const { email, password } = req.body;

    //email not entered
    if (!email) {
      return response_success(res, 400, false, 'email is required', null);

    }

    //password not enter
    if (!password) {
      return response_success(res, 400, false, "password is req.", null);
    }

    //if email exist or not if not please signup first
    const recruiter = await recruiterModel.findOne({ email });
    console.log(recruiter)
    if (!recruiter) {
      return response_success(res, 400, false, 'recruiter is not exist of this email  signup first', null)
    }

    const hashPass = recruiter.password;
    const comparePass = await bcrypt.compare(password, hashPass);
    if (!comparePass) {
      return response_success(res, 400, false, 'password not match', null)
    }

    const jwtPayload = { _id: recruiter._id, email: recruiter.email, role: recruiter.role }

    const tokens = generateToken(jwtPayload);
    console.log("tokens", tokens)
    recruiter.refreshToken = {
      token: tokens.refreshToken,
      expiryDate: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    }

    // Set cookies with new tokens
    res.cookie("REFRESH_TOKEN", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });
    res.cookie("ACCESS_TOKEN", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000,
      sameSite: "Strict",
    });

    await recruiter.save();


    return response_success(res, 200, true, 'user login successfuly', { "tokens": tokens, recruiter })

  } catch (error) {
    response_success(res, 500, false, 'catch error in recruiter login', error.message)
  }
}




//refresh Token api

const refresh = async (req, res) => {

  try {



    const recruiter = await recruiterModel.findOne({ email: req.refreshVerification.payload.email });
    const payload = { _id: recruiter._id, email: recruiter.email };

    const tokens = generateToken(payload);

    recruiter.refreshToken = {
      token: tokens.refreshToken
    }
    recruiter.save();

    // Set cookies with new tokens
    res.cookie("REFRESH_TOKEN", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });
    res.cookie("ACCESS_TOKEN", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000,
      sameSite: "Strict",
    });
    return response_success(res, 200, true, "token regenrate succesfully", tokens)


  } catch (error) {
    return response_success(res, 500, false, "error in catch api of refresh", error.message)
  }
}

//CRUD OF RECRUITER DETAILS

// get all recruiters
const get_recruiter = async (req, res) => {

  try {
    const role = req.refreshVerification.payload.role;
    const id = req.refreshVerification.payload._id;
    const { recruiterID } = req.query;


    // if role is candidate then dont allow it
    if (role == 'c') {
      return response_success(res, 403, false, 'you are not authorized to access this api only recruiter can do ', null)
    }

    // if role is admin then allow it 
    if (role == 'a') {

      if (recruiterID) {
        const recruiter = await recruiterModel.findOne({ _id: recruiterID }).select('-refreshToken');
        console.log("recruiter", recruiter)
        if (recruiter.length == 0) {
          return response_success(res, 404, false, 'recruiter not found', null)
        }
        return response_success(res, 200, true, 'recruiter found', recruiter);
      }

      const recruiters = await recruiterModel.find({}).select('-refreshToken');
      if (!recruiters) {
        return response_success(res, 404, false, 'recruiter not found', null)
      }

      return response_success(res, 200, true, 'recruiters found', recruiters)

    }

    if (role == 'r') {
      const recruiter = await recruiterModel.findOne({ _id: id }).select('-refreshToken');
      if (!recruiter) {
        return response_success(res, 404, false, 'recruiter not found', null)
      }
      return response_success(res, 200, true, 'recruiter found', recruiter)
    }


  } catch (error) {
    return response_success(res, 500, false, 'error in catch api', error.message)
  }

}

// update the recruiter details 
const update_recruiter = async (req, res) => {
  try {

    const role = req.refreshVerification.payload.role;
    const id = req.refreshVerification.payload._id;
    const { recruiterID, ...updateData } = req.body;


    //if the role is candidate then dont allow to update the things
    if(role=='c'){
      return response_success(res, 403, false, 'you are not authorized to access this api only recruiter can do ', null)
    }

    //if role is recruiter then allow it to update some of the fields not the recruiter id 
    if (role == 'r' ) {
      const recruiter = await recruiterModel.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });
      if (recruiter) {
        return response_success(res, 200, true, 'recruiter updated successfully', recruiter)
      }

      return response_success(res, 404, false, 'recruiter not found', null)

    }

    //if the role is admin then fetch the recruiter id from body and then update the things
    if(role == 'a') {
      const recruiter = await recruiterModel.findOneAndUpdate({ _id: recruiterID }, { $set: updateData }, { new: true });
      if (recruiter) {
        return response_success(res, 200, true, 'recruiter updated successfully', recruiter)
      }

      return response_success(res, 404, false, 'recruiter not found', null)
    }


    return response_success(res, 200, true, 'recruiter updated successfully', recruiter)

  } catch (error) {
    return response_success(res, 500, false, 'error in catch api', error.message)
  }
}

const delete_recruiter = async (req, res) => {
  try {

    const role = req.refreshVerification.payload.role;
    const id = req.params.id;

    if (role != 'a') {
      return response_success(res, 400, false, 'you are not authorized to access this api only admin can do ', null)
    }

    const recruiter = await recruiterModel.findOneAndDelete({ _id: id });
    if (!recruiter) {
      return response_success(res, 404, false, 'recruiter not found', null)
    }
    return response_success(res, 200, true, 'recruiter deleted successfully', recruiter)

  } catch (error) {
    return response_success(res, 500, false, 'error in catch api', error.message)
  }
}




export { recruiterDetails, recruiterLogin, refresh, uploadRecruiter, get_recruiter, update_recruiter, delete_recruiter }