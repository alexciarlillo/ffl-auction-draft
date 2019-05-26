import { observable } from "mobx";

export default class FranchiseModel {
  id = Math.random();
  @observable name;
  @observable budget;
  @observable is_admin;
  @observable remaining_budget;

  constructor({name, budget, id, is_admin, remaining_budget}) {
    this.id = id;
    this.name = name;
    this.budget = budget;
    this.is_admin = is_admin;
    this.remaining_budget = remaining_budget;
  }
}
