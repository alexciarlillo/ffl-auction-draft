import { observable } from "mobx";

export default class PlayerModel {
    id = Math.random();
    @observable name;

    constructor(name) {
        this.name = name;
    }
}