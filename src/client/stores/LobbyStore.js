import { observable, computed, action } from "mobx";
import FranchiseModel from "../models/FranchiseModel";

class LobbyStore {
  clockInterval = null;
  @observable clock;
  @observable playerId;
  @observable leadingBidAmount;
  @observable leadingFranchiseId;
  @observable franchises = [];

  @observable customBidAmount;

  constructor(playersStore, franchiseStore) {
    this.playersStore = playersStore;
    this.franchiseStore = franchiseStore;
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

  @action setFranchises(userFranchise, franchises) {
    this.franchiseStore.setFranchise(userFranchise);
    this.franchises = [];
    franchises.filter((franchise) => franchise.id !== userFranchise.id).forEach((franchise) => this.addFranchise(franchise));
  }

  @action addFranchise(franchise) {
    this.franchises.push(new FranchiseModel(franchise));
  }
}

export default LobbyStore;
