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
      const players = await ßfetchPlayers();
      const filteredPlayers = players
        .filter(player => player.active === "1")
        .map(
          player =>
            new PlayerModel(
              player.id,
              player.displayNamne,
              player.position,
              player.team
            )
        );

      runInAction(() => {
        this.loading = false;
        this.players = filteredPlayers;
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
