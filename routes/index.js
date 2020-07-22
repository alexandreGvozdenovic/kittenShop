var express = require('express');
var router = express.Router();
var kittensModel = require('../models/kittens');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // var newKitten = new kittensModel ({
  //   name: 'Cheddar',
  //   age: '8 months',
  //   available: true,
  //   price: 200,
  // })
  // await newKitten.save()
  res.render('index', { title: 'Express' });
});

module.exports = router;
