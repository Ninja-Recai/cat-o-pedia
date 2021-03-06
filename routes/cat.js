const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const DB = require('../js/db.js');

const db = new DB();

router.post(
  '/addCat',
  [
    body('imgUri', 'Please specify an image.')
      .not()
      .isEmpty(),
    body('title', 'Please specify a title')
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: true,
        message: errors.array().map(error => error.msg),
      });
    }

    db.connect(process.env.DEFAULT_URI).then(
      () => {
        db.saveCat(req.body).then(response => {
          if (response.ok !== false) {
            res.status(201).json(response);
            db.disconnect();
          } else {
            res.status(409).json({ error: true, message: response.message });
            db.disconnect();
          }
        });
      },
      err => {
        res.status(500).json({ error: true, message: err });
      }
    );
  }
);

router.get('/getList', function(req, res, next) {
  db.connect(process.env.DEFAULT_URI).then(
    () => {
      db.getCats().then(response => {
        res.json({ response });
        db.disconnect();
      });
    },
    err => {
      res.status(500).json({ error: true, message: err });
    }
  );
});

router.get('/getSingleCat/:cat', function(req, res, next) {
  db.connect(process.env.DEFAULT_URI).then(
    () => {
      db.getSingleCat(req.params.cat).then(response => {
        res.json({ response });
        db.disconnect();
      });
    },
    err => {
      res.status(500).json({ error: true, message: err });
    }
  );
});

router.get('/addLike/:cat', function(req, res, next) {
  db.connect(process.env.DEFAULT_URI).then(
    () => {
      db.addLike(req.params.cat).then(response => {
        res.json({ response });
        db.disconnect();
      });
    },
    err => {
      res.status(500).json({ error: true, message: err });
    }
  );
});

module.exports = router;
