const socket = io()
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');
let btn = document.querySelector('#btn')

do {
    name = prompt('Please Enter Your UserName :')
} while (!name)

btn.addEventListener('click', (e) => {
    let data = textarea.value
    // console.log(data);
    sendMessage(data)
})


const sendMessage = (message) => {
    let msg = {
        user: name,
        message: message.trim()
    }

    //append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // send to server 
    socket.emit('message', msg)

}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
    <h3>${msg.user}</h3>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

const scrollToBottom = () =>{
    messageArea.scrollTop = messageArea.scrollHeight    
}

//resive message

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})
