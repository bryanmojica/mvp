var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/herdly');

// serve up static files
app.use(express.static(__dirname + '/client'));


// MONGO / DB SETUP ------------------------------------------------------------------

// init Mongo schema

var lyricSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true
  },

  lyric: {
    type: String,
    required: true
  }
});

var Lyric = mongoose.model('Lyric', lyricSchema);

// THIS UTIL / REQUEST HANDLER METHOD IS A WIP 
var createNewLyric = function (req, resp) {
  var newLyric = new Lyric({ artist: 'test', lyric: 'wooah-oh' });
};



// ROUTES ----------------------------------------------------------------------------

app.get('/', function (req, res) {
  if ( req.method === 'GET' ) {
    console.log('we are live and listening -- herd.ly');	
  }
});

app.post('/api/lyrics', function(req, res) {
// generate a new lyric, information comes from AJAX request from Angular
  Lyric.create({
    artist: req.body,
    lyric: req.body
  });
  console.log('we got a post req');
});

app.get('/api/lyrics', function(req, res) {
// generate a new lyric, information comes from AJAX request from Angular
  res.send('THIS IS OUR CURRENT /api/lyrics RESPONSE');

  console.log('we got a post req');
});

// 404 service
app.get('/*', function (req, res) {
  res.send('are you lost? must be bc this here is our 404 notice. click yr heels and get back to the index.');
});

app.listen(1337);