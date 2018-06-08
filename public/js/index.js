var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//     from: 'Sender',
//     text: 'New message from client'
// })

socket.on('newMessage', function(message){
    console.log(message);
});

