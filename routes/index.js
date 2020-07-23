var express = require('express');
var router = express.Router();
var kittensModel = require('../models/kittens');
var userModel = require('../models/users');
var uid2 = require('uid2');
var SHA256 = require('crypto-js/sha256');
var encBase64 = require('crypto-js/enc-base64');

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

// SIGN UP
router.post('/sign-up', async function(req, res, next) {

  console.log(req.body);
  var error = []
  var result = false
  var saveUser = null
  var token = null

  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  var emailFormat = req.body.emailFromFront.match(regex);

  if(emailFormat == null) {
    error.push('veuillez rentrer un email correct')
  }
  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  // ERROR HANDLERS :
  // DOES USER EXISTS ?
  if(data != null){
    error.push('utilisateur déjà présent')
  }
  // ARE ALL THE INFORMATION REQUIRED PRESENT ?
  if(req.body.firstNameFromFront == ''
  || req.body.lastNameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }

  // IF THERE'S NO ERROR WE SAVE THE USER IN DATABASE
  if(error.length == 0){

    var salt = uid2(32)
    var newUser = new userModel({
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email: req.body.emailFromFront,
      password: SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
    })
  
    saveUser = await newUser.save()
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }

  res.json({result, saveUser, error, token})
  
})

// SIGN IN
router.post('/sign-in', async function(req, res, next) {

  console.log(req.body);
  var error = []
  var result = false
  var user = null
  var token = null
  
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  var emailFormat = req.body.emailFromFront.match(regex);

  if(emailFormat == null) {
    error.push('veuillez rentrer un email correct')
  }
  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  // ERROR HANDLERS :
  // ARE ALL THE INFORMATION REQUIRED PRESENT ?
  if(req.body.emailFromFront == '' || req.body.passwordFromFront == '') {
    error.push('champs vides')
  }

  // IF THERE'S NO ERROR WE SEARCH FOR THE USER
  if(error.length == 0){
    user = await userModel.findOne({
      email: req.body.emailFromFront
    })
    // IF USER EXIST WE TRY TO COMPARE BOTH PASSWORD ENCRYPTED
    if(user) {
      const passwordEncrypt = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64)
      if(passwordEncrypt == user.password) {
        result = true;
        token = user.token;
      } else {
        error.push('wrong email or password');
      }
    } else {
      error.push('wrong email or password');
    }
  }
  res.json({result, user, error, token})
  
})

module.exports = router;
