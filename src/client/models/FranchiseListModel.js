import { observable, computed, action } from "mobx";

import FranchiseModel from "./FranchiseModel";

export default class PlayerListModel {
  @observable franchises = [];

  @computed
  get myFranchise() {
    return this.franchises[0];
  }

  @action
  addFranchise(name, budget) {
    this.franchises.push(new FranchiseModel(name, budget));
  }
}
