const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /frequency endpoint', () => {
    it('should receive a string', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: "string, dude" })
            .expect(200)
            .expect('Content-Type', /json/)
    });

    it('should throw an error if no input', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: ''})
            .expect(400, 'Invalid request')
    });

    it('should return an object', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: "abracadabra"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object')
            })
    })

    it('should count frequency of occurance of each character in string', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: "abracadabra"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.include({ "b": 2 })
            })
    });

    it('should count the total number of distinct characters', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: "abracadabra"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.include({  unique: 5 })
            })
    });

    it('should give an average frequency of characters', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: "abracadabra"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.include({ average: (11/5) })
            })
    });

    it('should give the character with the highest frequency', () => {
        return supertest(app)
            .get('/frequency')
            .query({ s: "abracadabra"})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.include({ highest: 'a' })
            })
    });
});