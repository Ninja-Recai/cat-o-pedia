const request = require('supertest');
const app = require('../app');
const DB = require('../js/db');
const db = new DB();

let catData = {};

beforeAll(() => {
  catData = {
    imgUri: 'https://i.chzbgr.com/full/9013910528/hAB49129F/',
    title: 'Evil cat with wöter',
    desc: 'I nöck de wöter',
  };
});

afterAll(() => {
  db.connect(process.env.DEFAULT_URI).then(() => {
    db.removeCat(catData).then(() => {
      db.disconnect();
    });
  });
});

describe('Getting the cats list', () => {
  it('returns a 200 status code', done => {
    request(app)
      .get('/cats/getList')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('returns cats list', done => {
    request(app)
      .get('/cats/getList')
      .then(response => {
        expect(Array.isArray(response.body.response)).toBe(true);
        done();
      });
  });
});

describe('Adding a new cat', () => {
  describe('When the data is invalid', () => {
    const invalidcatData = {
      imgUrl: '',
      title: '',
      desc: '',
    };

    it('returns a 422 status code', done => {
      request(app)
        .post('/cats/addCat')
        .send(invalidcatData)
        .then(response => {
          expect(response.statusCode).toBe(422);
          done();
        });
    });
  });

  describe('When the data is valid', () => {
    it('returns a 201 status code', done => {
      request(app)
        .post('/cats/addCat')
        .set('Content-Type', 'application/json')
        .send(catData)
        .then(response => {
          expect(response.statusCode).toBe(201);
          done();
        });
    });

    describe('When the cat already exists in the database', () => {
      it('returns a 409 status code', done => {
        request(app)
          .post('/cats/addCat')
          .set('Content-Type', 'application/json')
          .send(catData)
          .then(response => {
            expect(response.statusCode).toBe(409);
            done();
          });
      });
    });
  });
});
