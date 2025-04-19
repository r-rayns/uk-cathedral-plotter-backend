import { Request, Response, Router } from 'express';
import { Success } from '../../models/response-codes.js';
import { DateTime } from 'luxon';

export const utilityRoutes = (router: Router) => {
  router.get('/ping', (req: Request, res: Response<{ data: PingResponse }>) => {
    res.status(Success.OK).json({
      data: {
        dateTime: DateTime.now().toUnixInteger(),
        status: 'OK',
      }
    });
  });
};

export interface PingResponse {
  dateTime: number;
  status: string;
}