import express from 'express';
import { interviewDetails } from '../controllers/interview.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const interviewRoutes = express.Router();



//cretae a new interview
interviewRoutes.post('/interviewCreate',verifyToken,interviewDetails)


export {interviewRoutes}