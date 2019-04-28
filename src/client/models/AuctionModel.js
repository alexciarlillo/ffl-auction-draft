import { observable, computed, action } from "mobx";

import playersStore from "./PlayersStore";
import franchisesStore from "./FranchisesStore";

export default class AuctionModel {
  @observable clock;
  @observable playerId;
  @observable leadingBidAmount;
  @observable leadingFranchiseId;

  @computed get player() {
    return playersStore.getPlayer(this.playerId);
  }

  @computed get leadingFranchise() {
    return franchisesStore.getFranchise(this.leadingFranchiseId);
  }

  @action startClock() {
    setInterval(() => {
      this.clock--;
    }, 1000);
  }

  constructor(clock, playerId) {
    this.clock = clock;
    this.playerId = playerId;
    this.leadingFranchiseId = 0;
    this.leadingBidAmount = 10;
  }
}
