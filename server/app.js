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
        // console.log(players.length)
        const player = {
            playerName,
            position: 0,
            playerIndex: players.length
        }
        players.push(player)
        io.emit('player-data', players)
        // console.log(nickname)
    })

    socket.on('add-step', (currentIndex) => {
        const steps = gameCompute.rollDice()
        players[currentIndex].position += steps
        if (players[currentIndex].position >= 10) {
            players[currentIndex].position = 10
            io.emit('player-win', players[currentIndex])
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