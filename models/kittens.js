const mongoose = require('mongoose');

var kittensSchema = mongoose.Schema({
    name: String,
    age: String,
    available: Boolean,
    price: Number,
  });
  
  var kittensModel = mongoose.model('kittens', kittensSchema);

  module.exports = kittensModel;