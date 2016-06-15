// Init socket.io connection
var socket = io()

var formEl = document.getElementById('chat-form')
var msgEl = document.getElementById('chat-msg')
var typingEl = document.getElementById('is-typing')
var msgContainer = document.getElementById('msg-container')
var username = document.getElementById('username')

var typing = false

formEl.addEventListener('submit', function (e) {
  e.preventDefault()
  socket.emit('chat message', {
    'msg': msgEl.value,
    'username': username.value
  })
  msgEl.value = ''
  return false
})

msgEl.addEventListener('keypress', function (e) {
  if (typing == false) {
    typing = true
    socket.emit('user typing', username.value)
  } else {
    console.log(typing)
    socket.emit('user not typing', false)
  }
})

socket.on('chat message', function (obj) {
  obj.username ? msgContainer.innerHTML += "<li class='msg'>" + obj.username + ':' + obj.msg + '</li>' : msgContainer.innerHTML = ' '
})

socket.on('user typing', function (username) {
  typingEl.innerHTML = "<li class='msg'>" + username + ': Is typing...' + '</li>'
})

socket.on('user not typing', function () {
  typingEl.innerHTML = ' '
})
