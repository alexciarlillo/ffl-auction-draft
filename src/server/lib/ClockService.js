const socketioJwt = require('socketio-jwt');

class ClockService {

  constructor(io) {
    this._io = io;
    this._clockInterval = null;
    this._clocks = [];

    this._io.sockets.on('connection', socketioJwt.authorize({
      secret: process.env.JWT_TOKEN_SECRET,
      timeout: 10000
    })).on('authenticated', (socket) => {
      const lobby = socket.decoded_token.franchise.lobby_id;
      console.log(`Franchise ${socket.decoded_token.franchise.name} join lobby ${lobby}`);
      socket.join(lobby);
      this._io.sockets.in(lobby).emit('message', `Welcome to lobby ${lobby}`);
    });

    this._clockInterval = setInterval(() => {
      this._clocks.forEach((lobbyClock) => {
        if (! lobbyClock.paused && lobbyClock.remaining > 0) {
          lobbyClock.remaining--;
        }

        this._io.sockets.in(lobbyClock.lobbyId).emit('tick', lobbyClock);
      })
    }, 1000);
  }

  createClock(lobbyId, time, paused = true) {
    let lobbyClock = this._clocks.find((lobbyClock) => lobbyClock.lobbyId === lobbyId);

    if (! lobbyClock) {
      this._clocks.push({ lobbyId, remaining: time, paused });
    } else {
      lobbyClock.remaining = time;
      lobbyClock.paused = paused;
    }
  }

  startClock(lobbyId) {
    let lobbyClock = this._clocks.find((lobbyClock) => lobbyClock.lobbyId === lobbyId);

    if (! lobbyClock) {
      this.createClock(lobbyId, 120, false);
    }

    if (lobbyClock && lobbyClock.paused) {
      lobbyClock.paused = false;
    }
  }

  stopClock(lobbyId) {
    let lobbyClock = this._clocks.find((lobbyClock) => lobbyClock.lobbyId === lobbyId);

    if (lobbyClock && ! lobbyClock.paused) {
      lobbyClock.paused = true;
    }
  }
}

module.exports = (io) => {return new ClockService(io)};