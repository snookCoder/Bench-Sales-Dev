import express from 'express'
import { recruiterDetails, recruiterLogin, refresh } from '../controllers/recruiterController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const recruiterRoute = express.Router();



recruiterRoute.post('/createRecruiter',recruiterDetails);
recruiterRoute.post('/loginRecruiter',recruiterLogin);
recruiterRoute.post('/refresh',verifyToken,refresh)

export {recruiterRoute}