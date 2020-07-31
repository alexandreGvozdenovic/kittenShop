var express = require('express');
var router = express.Router();
var kittensModel = require('../models/kittens');
var userModel = require('../models/users');
var uid2 = require('uid2');
var SHA256 = require('crypto-js/sha256');
var encBase64 = require('crypto-js/enc-base64');
const stripe = require('stripe')('sk_test_Rdz8xdBt5njp17ENWCDDTjxh005LCMv9UB');


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// SIGN UP
router.post('/sign-up', async function(req, res, next) {

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

// GET KITTENS FROM DB

router.get('/load-kittens', async function(req,res,next){
  var kittens = await kittensModel.find();
  res.json({kittens})
})
// CREATE SESSION ID

router.post('/buy', async function(req,res,next){

  var kittens = JSON.parse(req.body.kittensFromFront);
  var stripeItems = kittens.map((kitty) => {
    return({
      price_data: {
        currency: 'eur',
        product_data: {
          name: kitty.name,
        },
        unit_amount: kitty.price*100,
      },
      quantity: 1,
    })
  })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeItems,
    mode: 'payment',
    success_url: 'http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3001/cancel',
  });
  res.json(session);
})

// Add order to History
router.post('/success', async function(req,res,next){
  const basket = JSON.parse(req.body.basketFromFront);
  var user = await userModel.findOne({token: req.body.tokenFromFront});
  for(let i = 0 ; i < basket.length ; i++) {
    await kittensModel.updateOne({_id: basket[i].id},{available: false});
    user.orders.push(basket[i]);
  }
  await user.save();
})

// Load History
router.get('/load-history', async function(req, res, next){
  let user = await userModel.findOne({token: req.query.tokenFromFront});
  res.json(user.orders);
})

module.exports = router;
