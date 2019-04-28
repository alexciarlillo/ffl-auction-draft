import { observable, computed, action } from "mobx";

import FranchiseModel from "../models/FranchiseModel";

class FranchisesStore {
  @observable franchises = [];

  @computed get myFranchise() {
    return this.franchises[0];
  }

  @action addFranchise(name, budget) {
    this.franchises.push(new FranchiseModel(name, budget));
  }

  getFranchise(index) {
    if (this.franchises.length > 0) return this.franchises[0];

    return { name: "loading" };
  }
}

export default FranchisesStore;
