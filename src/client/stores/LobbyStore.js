import { observable, computed, action } from "mobx";
import FranchiseModel from "../models/FranchiseModel";
import io from 'socket.io-client';
import axios from 'axios';

class LobbyStore {
  @observable clockRemaining = null;
  @observable playerId;
  @observable leadingBidAmount;
  @observable leadingFranchiseId;
  @observable franchises = [];
  @observable socket = null;
  @observable paused = false;
  @observable lobbyInfo = {};

  @observable customBidAmount;

  constructor(playersStore, franchiseStore) {
    this.playersStore = playersStore;
    this.franchiseStore = franchiseStore;
  }

  @computed get player() {
    return this.playersStore.players.getPlayer(this.playerId);
  }

  @computed get leadingFranchise() {
    return this.franchisesStore.getFranchise(this.leadingFranchiseId);
  }

  @computed get clock() {
    return this.clockRemaining || this.lobbyInfo.default_clock || 120;
  }

  @computed get minutes() {
    return Math.floor(this.clock / 60);
  }

  @computed get seconds() {
    return this.clock % 60;
  }

  @computed get minimumBidAmount() {
    return this.leadingBidAmount + 1;
  }

  @action setLobbyInfo(lobbyInfo) {
    this.lobbyInfo = {...this.lobbyInfo, ...lobbyInfo};
  }

  @action tock({remaining, paused}) {
    this.clockRemaining = remaining;
    this.paused = paused;
  }

  @action setCustomBid(amount) {
    if (amount > this.leadingBidAmount) {
      this.customBidAmount = amount;
    }
  }

  @action makeBid(amount) {
    if (amount > this.leadingBidAmount) {
      this.leadingBidAmount = amount;
    }

    if (this.customBidAmount < this.leadingBidAmount) {
      this.setCustomBid(this.leadingBidAmount + 1);
    }
  }

  @action setFranchises(userFranchise, franchises) {
    this.franchiseStore.setFranchise(userFranchise);
    this.franchises = [];
    franchises.filter((franchise) => franchise.id !== userFranchise.id).forEach((franchise) => this.addFranchise(franchise));
  }

  @action addFranchise(franchise) {
    this.franchises.push(new FranchiseModel(franchise));
  }

  @action establishSocket(token) {
    this.socket = io.connect("http://localhost:3000");

    this.socket.on('connect', () => {
      this.socket
        .emit('authenticate', {token: localStorage.getItem("jwt")})
        .on('authenticated', () => {
          // trigger UI element to show connection status
          console.log('authenticated');
        })
        .on('unauthorized', (msg) => {
          console.log('unauthorized: ' + JSON.stringify(msg.data));
        })
    });

    this.socket.on('tick', (data) => {
      this.tock(data);
    })
  }

  async pauseClock() {
    const response = await axios.post(`/api/lobby/${this.lobbyInfo.id}/pause`, {remaining: this.clock}, {
      headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
    });
  }

  async startClock() {
    const response = await axios.post(`/api/lobby/${this.lobbyInfo.id}/start`, {remaining: this.clock}, {
      headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
    });
  }

  async resetClock() {
    const response = await axios.post(`/api/lobby/${this.lobbyInfo.id}/reset`, {remaining: this.clock}, {
      headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
    });
  }

  @action disconnectSocket() {
    this.socket.disconnect();
  }
}

export default LobbyStore;
