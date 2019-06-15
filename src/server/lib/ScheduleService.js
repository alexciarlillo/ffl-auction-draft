const DB = require('./db');
const schedule = require('node-schedule');

class ScheduleService {
  static async Start() {
    schedule.scheduleJob('* * * * *', DB.startReadyLobbies);
  }
}

module.exports = ScheduleService;
