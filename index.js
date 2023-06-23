require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8080;
var db = 'mongodb+srv://roshankumarsinghbhumca21:roshan123456@cluster0.llax1nf.mongodb.net/?retryWrites=true&w=majority';

var authbooks = require('./routes/rout');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, function () {
      console.log('App listening on port: ' + port);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/books', authbooks);

app.get('/', function (req, res) {
  console.log('App starting on port: ' + port);
  res.send('Test Express Node.js MongoDB');
});
