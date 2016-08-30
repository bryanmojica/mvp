var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/herdly');

// serve up static files
app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
  if ( req.method === 'GET' ) {
    console.log('we are live and listening -- herd.ly');	
  }
});

// 404 service
app.get('/*', function (req, res) {
  res.send('are you lost? must be bc this here is our 404 notice. click yr heels and get back to the index.');
});

// init Mongo schema

var LyricSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true
  },

  lyric: {
    type: String,
    required: true
  }
});

app.listen(1337);