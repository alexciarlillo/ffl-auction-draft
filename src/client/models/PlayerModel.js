import { observable } from "mobx";
export default class PlayerModel {
  @observable id;
  @observable name;
  @observable team;
  @observable position;
  @observable active;

  constructor(player) {
    this.id = player.id;
    this.name = player.displayName;
    this.position = player.position;
    this.team = player.team;
    this.active = player.active;
  }
}
