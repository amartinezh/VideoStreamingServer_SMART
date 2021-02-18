const express = require('express');
const app = express();

const http = new require('http').Server(app);

const io = require('socket.io')(http);

// Routes

app.use(require('./routes/littlezoom.routes'));

io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        // emit the event to all socket onoine
        socket.broadcast.emit('stream', image);
    });
});

// Create the files HTML to work
app.use(express.static(__dirname + "/public"));

module.exports = http;
