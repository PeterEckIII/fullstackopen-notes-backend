const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('API', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })

    test('there are five notes returned', async() => {
        const res = await api.get('/api/notes')
        expect(res.body.length).toBe(5);
    })

    test('the first note is about Express', async () => {
        const res = await api.get('/api/notes');
        expect(res.body[0].content).toBe('Express is a great framework')
    })
})

afterAll(() => {
    mongoose.connection.close();
})
