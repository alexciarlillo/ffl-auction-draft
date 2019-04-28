import { observable, computed, action } from "mobx";

import FranchiseModel from "./FranchiseModel";

class FranchisesStore {
  @observable franchises = [];

  getFranchise(index) {
    if (this.franchises.length > 0) return this.franchises[0];

    return { name: "loading" };
  }

  @computed
  get myFranchise() {
    return this.franchises[0];
  }

  @action
  addFranchise(name, budget) {
    this.franchises.push(new FranchiseModel(name, budget));
  }
}

export default new FranchisesStore();
