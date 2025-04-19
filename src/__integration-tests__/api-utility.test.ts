import { describe, test, expect } from 'vitest';
import supertest from 'supertest';
import { Success } from '../models/response-codes.js';
import { PingResponse } from '../routes/utility/utility.routes.js';
import { createExpressServer } from '../express-server.js';

describe('api utility', () => {
  test('should GET api/ping', async () => {
    const res = await supertest(createExpressServer())
      .get('/api/ping')
      .expect(Success.OK)

    const body = res.body as { data: PingResponse };

    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('data.status');
    expect(body).toHaveProperty('data.dateTime');

    expect(body.data.status).toBe('OK');
    expect(typeof body.data.dateTime).toBe('number');
  })
})