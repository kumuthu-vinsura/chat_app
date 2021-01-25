const socket = io('http://localhost:3000') 
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')
const onlineCount = document.getElementById('online')

const nameofuser = prompt('What is your good name ?', "Noobie") 

appendMassage('You Joind', 'BOT Message')
socket.emit('new-user', nameofuser )

socket.on('users-online', numofusers =>{
    onlineCount.innerHTML=numofusers
})

socket.on('chat-message', data =>{
    appendMassage(data.message, data.nameofuser)
    window.focus()
    window.scrollTo(0, messageContainer.scrollHeight)
})

socket.on('user-connected', nameofuser =>{
    appendMassage(nameofuser+' landed to the chat', 'BOT Message' )
    window.scrollTo(0, messageContainer.scrollHeight)
})

socket.on('user-disconnected', nameofuser =>{
    appendMassage(nameofuser+' left the chat', 'BOT Message' )
    window.scrollTo(0, messageContainer.scrollHeight)
})



messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    if(message.trim() != ''){
        appendMassageMe(message)
        window.focus()
        window.scrollTo(0, messageContainer.scrollHeight)
        socket.emit('send-chat-message',message)
        messageInput.value = ''
    }
    messageInput.focus()
})

function appendMassage(message, name){
    const messageElement = document.createElement('div')
    messageElement.classList.add('message-they')
    messageElement.innerHTML = '<strong>'+name+'</strong><p>'+message+'</p>'
    messageContainer.append(messageElement)
}
function appendMassageMe(message){
    const messageElement = document.createElement('div')
    messageElement.classList.add('message-me')
    messageElement.innerHTML = '<strong>You</strong><p>'+message+'</p>'
    messageContainer.append(messageElement)
}

