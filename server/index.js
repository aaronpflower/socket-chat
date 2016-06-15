var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log("YO YOU CONNECTED");
	io.emit("chat message", "New User Connected")
	socket.on('disconnect', function() {
		io.emit("chat message", "User Disconnected")
	})
  socket.on("chat message", function(obj){
  	io.emit('chat message', { "msg": obj.msg, "username": obj.username } )
    console.log(obj)
  })
  socket.on("user typing", function(username) {
  	socket.broadcast.emit('user typing', username)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

