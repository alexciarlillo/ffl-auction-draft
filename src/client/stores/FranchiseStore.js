import { observable, action } from "mobx";

import FranchiseModel from "../models/FranchiseModel";

class FranchiseStore {
  @observable franchise = {};

  @action setFranchise(franchise) {
    this.franchise = new FranchiseModel(franchise);
  }
}

export default FranchiseStore;
