var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log("YO YOU CONNECTED");
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});