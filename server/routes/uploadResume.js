import express from 'express';
import { upload } from '../utils/multer.js';
import { candidateResume } from '../controllers/candidateResume.js';



const uploadResume = express.Router();

uploadResume.post('/uploadResume',upload.single('resume'),candidateResume)



export {uploadResume}