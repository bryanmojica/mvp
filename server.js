var express = require('express');
var app = express();

// serve up static files
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  if ( req.method === 'GET' ) {
    console.log('we are live and listening -- herd.ly, copyright 2k16');	
  }
});

// 404 service
app.get('/*', function (req, res) {
  res.send('are you lost? must be bc this here is our 404 notice. click yr heels and get back to the index.');
});

app.listen(1337);