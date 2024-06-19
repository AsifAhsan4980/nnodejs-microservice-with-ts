import request, { Response } from 'supertest';
import app from '../app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db';

dotenv.config({ path: '../env' });

beforeAll(async () => {
    await connectDB();
    console.log('MongoDB connected');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth - register - /auth/register', () => {
    test('registration', async () => {
        const response: Response = await request(app)
            .post('/auth/register')
            .send({
                email: 'testemail@test.com',
                password: 'Mike4980%%',
            });

        const { body, status }: { body: any; status: number } = response;
        console.log(body, status);

        if (status === 200) {
            expect(body).toHaveProperty('email');
            expect(status).toBe(200);
        } else {
            expect(body).toHaveProperty('message');
            expect(status).toBe(400);
        }
    }, 10000);
});

describe('Auth - login - /auth/login', () => {
    test('login', async () => {
        const response: Response = await request(app)
            .post('/auth/login')
            .send({
                email: 'testemail@test.com',
                password: 'Mike4980%%',
            });

        const { body, status }: { body: any; status: number } = response;
        console.log(body, status);

        if (status === 200) {
            expect(body).toHaveProperty('email');
            expect(body).toHaveProperty('token');
            expect(status).toBe(200);
        } else {
            expect(body).toHaveProperty('message');
            expect(status).toBe(400);
        }
    }, 10000);
});
