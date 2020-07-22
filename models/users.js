const mongoose = require('mongoose');

var kittensSchema = mongoose.Schema({
    name: String,
    age: String,
    available: Boolean,
    price: Number,
  });

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    orders: [kittensSchema],
  });
  
  var userModel = mongoose.model('users', userSchema);

  module.exports = userModel;