import { observable, computed, action } from "mobx";

import PlayerModel from "./PlayerModel";

export default class PlayerListModel {
    @observable players = [];

    @action
    addPlayer(name) {
        this.players.push(new PlayerModel(name));
    }
}