const mongoose = require('mongoose');

var kittensSchema = mongoose.Schema({
  name: String,
  age: String,
  available: Boolean,
  price: Number,
  imgUrl: String,
  });

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
    salt: String,
    orders: [kittensSchema],
  });
  
  var userModel = mongoose.model('users', userSchema);

  module.exports = userModel;