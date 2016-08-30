var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var request = require('request');
var bodyParser = require('body-parser');
var Q = require('q');

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

var returnLyrics = function () {

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

// to avoid CORS issue, we hit the API from server side, sending the req data back to
// client
app.get('/api/givemelyrics', function (req, res) {
/*	console.log('REQ DATA PARAM ARE', req.query);
	console.log('INDIV VALS ARE', req.query.trackArtist + req.query.trackName);*/
  var trackArtist = req.query.trackArtist;
  var trackName = req.query.trackName;
	/*console.log('REQ DATA URL IS', req.url);
	console.log('REQ DATA HERE IS', req.url.params);*/
	// res.send('HERE IS A GIVEMELYRIC RESPONSE');
  request.get('http://api.lyricsnmusic.com/songs?api_key=dd7afb1b9dc70db68cef04c42d37ef&&artist=' + trackArtist + '&song=' + trackName).on('response', function(response) {
    var received = '';

    response.on('data', function (chunk) {
      received += chunk;
    });
    response.on('end', function () {
      /*console.log(received);*/
      res.send(received);
    });
  }).on('error', function(error) {
    console.log(error);
    res.send(error);
  });

});

// app.get('/api/lyrics', function(req, res) {
// generate a new lyric, information comes from AJAX request from Angular
  /*res.send('THIS IS OUR CURRENT /api/lyrics RESPONSE');
  returnLyrics({

  });
});*/

// 404 / other routing
app.get('/*', function (req, res) {
  res.send('are you lost? must be bc this here is our 404 notice. click yr heels, repeat \"there\'s no place like home\" (try hitting the back button), and get back to the index.');
});

app.listen(1337);