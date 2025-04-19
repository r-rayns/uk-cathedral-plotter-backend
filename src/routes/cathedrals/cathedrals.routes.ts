import { Router } from 'express';
import { cathedralController } from '../../controllers/cathedral.controller.js';


export const cathedralsRoutes = (router: Router) => {
  router.get('/cathedrals', cathedralController.retrieve)

}