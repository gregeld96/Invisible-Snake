const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000
const cors = require('cors')
const gameCompute = require('./helpers/gameCompute')

app.use(cors())

let players = [] // create socket for adding the players

io.on('connection', socket => {
    console.log('User Connected')
    socket.on('user-join', (playerName) => {
        const player = {
            playerName,
            position: 0,
            playerIndex: players.length
        }
        players.push(player)
        io.emit('player-data', players)
    })

    socket.on('add-step', (currentIndex) => {
        const steps = gameCompute.rollDice()
        players[currentIndex].position += steps
        if (players[currentIndex].position >= 100) {
            players[currentIndex].position = 100
            io.emit('player-win', players[currentIndex])
            io.emit('player-data', players)
        } else if (players[currentIndex].position === 5 || players[currentIndex].position === 25 || players[currentIndex].position === 2) {
            players[currentIndex].position = 39
            io.emit('player-data', players)
            io.emit('ladder', currentIndex)
        } else if (players[currentIndex].position === 3 || players[currentIndex].position === 20 || players[currentIndex].position === 6 || players[currentIndex].position === 50) {
            players[currentIndex].position = 1
            io.emit('player-data', players)
            io.emit('snake', currentIndex)
        } else {
            io.emit('player-data', players)
        }
    })

    socket.on('changePlayer', (currentIndex) => {
        io.emit('changePlayer', currentIndex)
    })

    socket.on('restart', () => {
        players = []
        io.emit('restart-game', players)
    })
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})