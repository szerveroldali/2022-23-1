const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer);

games = [];

io.on('connection', socket => {
    console.log('Client connected', socket.id);

    socket.on('tip', (data, ack) => {
        console.log(data);
        try {
            const { number } = data;
            if (number === undefined) {
                throw new Error('No number specified');
            }
            if (isNaN(number)) {
                throw new Error('Not a number');
            }
            if (games[games.length - 1].tips.find(tip => tip.client === socket.id)) {
                throw new Error('Already tipped');
            }
            games[games.length - 1].tips.push({
                client: socket.id,
                number,
            });
            ack({ status: 'ok' });
        } catch (err) {
            ack({ status: 'error', message: err.message });
        }
    });
});

httpServer.listen(3000);

gameOver = () => {
    const sorted = games[games.length - 1].tips.sort((a, b) => a.number - b.number);
    console.log(sorted);
    const winner = sorted.find(
        tip => sorted.filter(other => other.number === tip.number).length === 1
    );
    games[games.length - 1].tips.forEach(tip => {
        io.to(tip.client).emit('game-over', {
            won: tip === winner,
            tipped: tip.number,
            winner: winner?.number,
        });
    });
};

startNewGame = () => {
    if (games.length) gameOver();
    games.push({
        startTime: Date.now(),
        tips: [],
    });
    io.emit('new-game-started');
    console.log('New game started');
    setTimeout(startNewGame, Math.floor(Math.random() * (15000 - 10000)) + 10000)
};

startNewGame();
