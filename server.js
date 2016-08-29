var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, resp) {
  if ( req.method === 'GET' ) {
    console.log('we are live and listening -- herd.ly, copyright 2k16');	
  }
});

app.listen(1337);