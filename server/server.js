const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Sender',
        text: 'Message text',
        createdAt: 1234
    });

    socket.on('createMessage', (message) => {
        console.log(message);
    })

    socket.on('disconnect', () => {
        console.log('Lost connection with client');
    })

});


server.listen(port, () => {
    console.log('Server is up on port', port);
})
