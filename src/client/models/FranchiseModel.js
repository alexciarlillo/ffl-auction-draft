import { observable } from "mobx";

export default class FranchiseModel {
  id = Math.random();
  @observable name;
  @observable budget;
  @observable selectedPlayers;

  constructor(name, budget, players = []) {
    this.name = name;
    this.budget = budget;
    this.selectedPlayers = players;
  }
}
