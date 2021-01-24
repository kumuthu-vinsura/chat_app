const io = require('socket.io')(3000)
const users = {}

io.on('connection', socket =>{
    console.log('New User Landed')
    socket.on('new-user', nameofuser =>{
        users[socket.id] = nameofuser
        socket.broadcast.emit('user-connected',nameofuser)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, nameofuser: users[socket.id]})
    })
})