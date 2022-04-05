var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/review')
  .then(() =>  console.log('Successfully connected to the database'))
  .catch((err) => console.error(err));

  