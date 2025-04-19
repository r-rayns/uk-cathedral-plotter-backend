import express from 'express';
import { utilityRoutes } from './utility/utility.routes.js';
import { cathedralsRoutes } from './cathedrals/cathedrals.routes.js';

const router = express.Router();

utilityRoutes(router);
cathedralsRoutes(router);

export default router;
