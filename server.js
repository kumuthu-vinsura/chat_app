const io = require('socket.io')(3000)
const users = {}

let numofusers = 0;

io.on('connection', socket =>{
    console.log('New User Landed')
    socket.on('new-user', nameofuser =>{
        users[socket.id] = nameofuser
        numofusers++
        socket.broadcast.emit('user-connected',nameofuser)
        io.emit('users-online',numofusers)
    })

    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
        numofusers--
        io.emit('users-online',numofusers)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, nameofuser: users[socket.id]})
    })
})
