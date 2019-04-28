import { observable } from "mobx";

export default class PlayerModel {
  id = Math.random();
  @observable name;
  @observable team;
  @observable position;

  constructor(id, name, position, team) {
    this.id = player.id;
    this.name = player.displayName;
    this.position = player.position;
    this.team = player.team;
  }
}
