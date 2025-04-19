import { Request, Response, NextFunction } from 'express';
import { Success } from '../models/response-codes.js';
import CathedralService from '../services/cathedral.service.js';
import { Cathedral } from '../models/cathedrals.js';

async function retrieve(req: Request, res: Response<{ data: Array<Cathedral> }>, next: NextFunction) {
  try {
    const cathedrals = await CathedralService.fetchCathedrals();
    res.status(Success.OK).json({data: cathedrals});
  } catch (err) {
    next(err)
  }
}

export const cathedralController = {
  retrieve
}