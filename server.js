const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('offer', (data) => {
        socket.broadcast.emit('offer', data);
    });

    socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
    });

    socket.on('desc', (data) => {
        socket.broadcast.emit('desc', data);
    });

    socket.on('initiate', () => {
        io.emit('initiate');
    });
});

http.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 3000!'))
