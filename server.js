// create express server 
const express =  require('express');
const { Socket } = require('socket.io')
const app = express();

const http =require('http').createServer(app);
const PORT = process.env.PORT || 3002

http.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})

app.use(express.static(__dirname + '/public')) //tell path to express server

// create routes 
app.get('/',(req,res)=>{
    // console.log(res);
    res.sendFile(__dirname + '/index.html')
})


//socket.io 
const io = require('socket.io')(http)

io.on('connection',(socket) =>{
    console.log('connected....');

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})

