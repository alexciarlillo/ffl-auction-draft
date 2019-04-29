import { observable, computed, action } from "mobx";

class LobbyStore {
  clockInterval = null;
  @observable clock;
  @observable playerId;
  @observable leadingBidAmount;
  @observable leadingFranchiseId;

  @observable customBidAmount;

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

  @computed get minutes() {
    return Math.floor(this.clock / 60);
  }

  @computed get seconds() {
    return this.clock % 60;
  }

  @computed get minimumBidAmount() {
    return this.leadingBidAmount + 1;
  }

  @action reset() {
    this.clock = 90;
    this.playerId = null;
    this.leadingBidAmount = 1;
    this.customBidAmount = 1;
    this.leadingFranchiseId = null;
  }

  @action startClock() {
    this.clockInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  @action tick() {
    if (this.clock > 0) {
      this.clock--;
    } else {
      this.clock = 0;
      clearInterval(this.clockInterval);
    }
  }

  @action setCustomBid(amount) {
    if (amount > this.leadingBidAmount) {
      this.customBidAmount = amount;
    }
  }

  @action makeBid(amount) {
    if (amount > this.leadingBidAmount) {
      this.leadingBidAmount = amount;
    }

    if (this.customBidAmount < this.leadingBidAmount) {
      this.setCustomBid(this.leadingBidAmount + 1);
    }
  }
}

export default LobbyStore;
