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
  if (msgEl.value !== '')
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

function capitalize (str) {
  return str[0].toUpperCase() + str.substring(1)
}

socket.on('chat message', function (obj) {
  obj.username ? msgContainer.innerHTML += "<li class='msg'>" + '<span>' + capitalize(obj.username) + ':</span>' + obj.msg + '</li>' : msgContainer.innerHTML = ' '
})

socket.on('user typing', function (username) {
  typingEl.innerHTML = "<li class='msg'>" + capitalize(username) + ': Is typing...' + '</li>'
})

socket.on('user not typing', function () {
  typingEl.innerHTML = ' '
})
