var express = require('express');
var app = express();

var port = process.env.PORT;
var server = app.listen(port, () => {
    console.log(`Starting Server at ${port}`);
});

app.use(express.static('public'));



var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

socket.on('emojiPosition', emojiMessage);

function emojiMessage(data) {
    socket.broadcast.emit('emojiPosition', data);
    console.log(data);
}

}