import express from 'express';
import { jobSubmit } from '../controllers/job.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const job =  express.Router();


//create the job for the candidate by the recruiter

job.post('/createjob',verifyToken,jobSubmit);


export {job}