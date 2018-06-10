var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//     from: 'Sender',
//     text: 'New message from client'
// })

socket.on('newMessage', function (message) {
    console.log(message);
    var li = $('<li></li>');
    li.text(message.from + ": " + message.text);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    li.text(message.from + ' is from: ');
    var a = $('<a target="_blank" ></a>');
    a.text('Click for position');
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
})

var messageTextbox = $('[name=message]');

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(){
            locationButton.removeAttr('disabled').text('Send location');
        });
    }, function () {
        alert('Unbale to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});