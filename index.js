var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('public'))

io.on('connection', function (socket) {
  // User connected
  io.emit('chat message', 'New User Connected')

  // Listen to disconnection event
  socket.on('disconnect', function () {
    io.emit('chat message', 'User Disconnected')
  })

  // Listen to new chat message event
  socket.on('chat message', function (obj) {
    // Broadcast chat message to everyone including sender
    io.emit('chat message', {
      'msg': obj.msg,
      'username': obj.username
    })
  })

  socket.on('user typing', function (username) {
    // Broadcast message to everyone except sender
    socket.broadcast.emit('user typing', username)
  })
  socket.on('user not typing', function (msg) {
    socket.broadcast.emit('user not typing', msg)
  })
})

http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
