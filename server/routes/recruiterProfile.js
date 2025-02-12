import express from 'express'
import { recruiterDetails, recruiterLogin, refresh, uploadRecruiter } from '../controllers/recruiterController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { upload } from '../utils/multer.js';

const recruiterRoute = express.Router();



recruiterRoute.post('/createRecruiter',recruiterDetails);
recruiterRoute.post('/uploadRecruiter',upload.fields([{name:'csvFile',maxCount:1}]),uploadRecruiter);
recruiterRoute.post('/loginRecruiter',recruiterLogin);
recruiterRoute.post('/refresh',verifyToken,refresh)

export {recruiterRoute}