import { observable, computed, action } from "mobx";

import PlayerModel from "./PlayerModel";

export default class PlayerListModel {
  @observable players = [];
  @observable loading = false;

  @computed
  get activePlayers() {
    return this.players.filter(player => player.active === "1");
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
