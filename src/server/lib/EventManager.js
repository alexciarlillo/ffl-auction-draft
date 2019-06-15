const DB = require('./db');

class EventManager {
  static async draftStarted({lobbyId}) {
    DB.systemEvent({
      lobbyId,
      eventTypeId: 1,
    });
  }
}

module.exports = EventManager;
