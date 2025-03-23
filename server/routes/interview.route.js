import express from 'express';
import { interview_data, interviewDetails } from '../controllers/interview.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const interviewRoutes = express.Router();



//cretae a new interview
interviewRoutes.post('/interviewCreate',verifyToken,interviewDetails)


//crud for interview 
interviewRoutes.get('/interviewGet',verifyToken,interview_data)

export {interviewRoutes}