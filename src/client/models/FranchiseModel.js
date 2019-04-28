import { observable } from "mobx";

export default class FranchiseModel {
  id = Math.random();
  @observable name;
  @observable budget;

  constructor(name, budget) {
    this.name = name;
    this.budget = budget;
  }
}
