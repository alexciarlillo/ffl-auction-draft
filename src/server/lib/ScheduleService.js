const DB = require('./db');
const schedule = require('node-schedule');
const EventManager = require('./EventManager');

class ScheduleService {
  static async Start() {
    schedule.scheduleJob('* * * * *', async () => {
      const lobbies = await DB.getStartableLobbies();
      console.log(lobbies);

      lobbies.forEach(lobby => {
        EventManager.draftStarted({
          lobbyId: lobby.id,
        });
      });
    });
  }
}

module.exports = ScheduleService;
