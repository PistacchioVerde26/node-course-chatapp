const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    });

    socket.on('disconnect', () => {
        console.log('Lost connection with client');
    })

});

server.listen(port, () => {
    console.log('Server is up on port', port);
})
