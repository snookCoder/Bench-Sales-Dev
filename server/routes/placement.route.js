import express from 'express';
import { placement_controller } from '../controllers/placement.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const placementRoutes = express.Router();   



//create the placement route
placementRoutes.post('/placement',verifyToken,placement_controller)




export {placementRoutes}