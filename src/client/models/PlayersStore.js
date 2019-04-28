import { observable, computed, action } from "mobx";

import PlayerModel from "./PlayerModel";

class PlayersStore {
  @observable players = [];
  @observable loading = false;

  @computed
  get activePlayers() {
    return this.players.filter(player => player.active === "1");
  }

  getPlayer(id) {
    return this.players.find(player => player.id === id);
  }

  @action
  loadPlayers() {
    this.loading = true;
    fetch("/players.json")
      .then(res => res.json())
      .then(data => {
        data.Players.forEach(player => {
          this.players.push(new PlayerModel(player));
        });
        this.loading = false;
      });
  }
}

export default new PlayersStore();
