import { observable, computed, action } from "mobx";

class LobbyStore {
  clockInterval = null;
  @observable clock;
  @observable playerId;
  @observable leadingBidAmount;
  @observable leadingFranchiseId;

  constructor(playersStore, franchisesStore) {
    this.playersStore = playersStore;
    this.franchisesStore = franchisesStore;
    this.reset();
  }

  @computed get player() {
    return this.playersStore.players.getPlayer(this.playerId);
  }

  @computed get leadingFranchise() {
    return this.franchisesStore.getFranchise(this.leadingFranchiseId);
  }

  @action reset() {
    this.clock = 120;
    this.playerId = null;
    this.leadingBidAmount = null;
    this.leadingFranchiseId = null;
  }

  @action startClock() {
    this.clockInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  @action tick() {
    this.clock--;
  }
}

export default LobbyStore;
