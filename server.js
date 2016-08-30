var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var request = require('request');

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

/*
app.get('/', function (req, res) {
  if ( req.method === 'GET' ) {
    console.log('we are live and listening -- herd.ly');	

    app.get('http://api.lyricsnmusic.com/songs?api_key=dd7afb1b9dc70db68cef04c42d37ef&q=%20clocks').then(function (data) {
  console.log('THE RESULT OF LYRIC API CALL IS ', data);
});
  }
});*/

app.post('/api/lyrics', function(req, res) {
// generate a new lyric, information comes from AJAX request from Angular
  Lyric.create({
    artist: req.body,
    lyric: req.body
  });

  console.log('we got a post req');
});

app.get('/api/givemelyrics', function (req, res) {
	// res.send('HERE IS A GIVEMELYRIC RESPONSE');
  request.get('http://api.lyricsnmusic.com/songs?api_key=dd7afb1b9dc70db68cef04c42d37ef&q=%20clocks').on('response', function(response) {
   /* if (err) {
      return err;
    }*/
    var received = '';

    response.on('data', function (chunk) {
      received += chunk;
    });
    response.on('end', function () {
      console.log(received);
      res.send(received);
    });
  }).on('error', function(error) {
    console.log(error);
    res.send(error);
  });

});

app.get('/api/lyrics', function(req, res) {
// generate a new lyric, information comes from AJAX request from Angular
  /*res.send('THIS IS OUR CURRENT /api/lyrics RESPONSE');*/
  console.log('we got a post req');
});

// 404 service
app.get('/*', function (req, res) {
  res.send('are you lost? must be bc this here is our 404 notice. click yr heels and get back to the index.');
});

app.listen(1337);