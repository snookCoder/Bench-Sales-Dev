import express from 'express'
import {  delete_recruiter, get_recruiter, recruiterDetails, recruiterLogin, refresh, update_recruiter ,uploadRecruiter } from '../controllers/recruiterController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { upload } from '../utils/multer.js';


const recruiterRoute = express.Router();



recruiterRoute.post('/createRecruiter',recruiterDetails);
recruiterRoute.post('/uploadRecruiter',upload.fields([{name:'csvFile',maxCount:1}]),uploadRecruiter);
recruiterRoute.post('/loginRecruiter',recruiterLogin);
recruiterRoute.post('/refresh',verifyToken,refresh)

// get all recruiters
recruiterRoute.get('/getRecruiters',verifyToken,get_recruiter);

//update the recruiter
recruiterRoute.patch('/updateRecruiter',verifyToken,update_recruiter);

//delete candidate
recruiterRoute.delete('/deleteRecruiter/:id',verifyToken,delete_recruiter);


export {recruiterRoute}