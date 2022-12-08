const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer);

io.on('connection', socket => {
    console.log('Client connected', socket.id);

    socket.on('test', (data, ack) => {
        console.log(data, ack);
        socket.emit('test-listen', 'hello thereeeeeee');
        ack({
            general: 'Kenobi',
        });
    });
});

httpServer.listen(3000);
