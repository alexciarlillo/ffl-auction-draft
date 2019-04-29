import { observable } from "mobx";

export default class PlayerModel {
  @observable id;
  @observable name;
  @observable team;
  @observable position;

  constructor(id, name, position, team) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.team = team;
  }
}
