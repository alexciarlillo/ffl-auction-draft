import { observable, computed, action, runInAction } from "mobx";
import PlayerModel from "../models/PlayerModel";

class PlayersStore {
  @observable players = [];
  @observable loading = true;
  @observable error = null;

  constructor() {
    this.loadPlayers();
  }

  @action
  async loadPlayers() {
    this.players = [];
    this.loading = true;
    this.error = null;

    try {
      let players = await fetchPlayers();
      let filteredPlayers = players.filter(player => player.active === "1");
      runInAction(() => {
        this.loading = false;
        filteredPlayers.forEach(player => {
          this.players.push(
            new PlayerModel(
              player.playerId,
              player.displayName,
              player.position,
              player.team
            )
          );
        });
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.error = error;
      });
    }
  }

  getPlayer(id) {
    return this.players.find(player => player.id === id);
  }
}

async function fetchPlayers() {
  let res = await fetch("/players.json");
  let data = await res.json();

  return data.Players;
}

export default PlayersStore;
