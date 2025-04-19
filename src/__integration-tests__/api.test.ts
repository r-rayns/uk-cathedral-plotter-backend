import { describe, expect, test } from 'vitest';
import supertest from 'supertest';
import { createExpressServer } from '../express-server.js';
import { ClientError } from '../models/response-codes.js';
import { missingRoute } from '../utils/error-factory.js';

describe('api', () => {
  test('should handle invalid path', async () => {
    const res = await supertest(createExpressServer())
      .get('/api/boop')
      .expect(ClientError.NOT_FOUND)

    const body = res.body as { message: string };

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual(missingRoute.message)
  })
})