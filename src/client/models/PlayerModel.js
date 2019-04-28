import { observable } from "mobx";
export default class PlayerModel {
  id = Math.random();
  @observable name;
  @observable team;
  @observable position;
  @observable active;

  constructor(player) {
    this.name = player.displayName;
    this.position = player.position;
    this.team = player.team;
    this.active = player.active;
  }
}
