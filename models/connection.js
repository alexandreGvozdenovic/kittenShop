const mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
 };
mongoose.connect('mongodb+srv://admin:gozigoza0807@cluster0-ry16u.mongodb.net/kittyShop?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);