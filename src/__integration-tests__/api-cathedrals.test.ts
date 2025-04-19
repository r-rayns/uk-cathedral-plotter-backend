import { describe, expect, test } from 'vitest';
import supertest from 'supertest';
import { Success } from '../models/response-codes.js';
import { Cathedral } from '../models/cathedrals.js';
import { createExpressServer } from '../express-server.js';

describe('api cathedrals', () => {
  test('should GET api/cathedrals', async () => {
    const res = await supertest(createExpressServer())
      .get('/api/cathedrals')
      .expect(Success.OK)

    const body = res.body as { data: Array<Cathedral> };

    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  })
})