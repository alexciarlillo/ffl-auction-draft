import React from "react";
import CreateLobby from "./components/CreateLobby";
import JoinLobby from "./components/JoinLobby";
import Lobby from "./components/Lobby";
import Franchise from "./components/Franchise";

import { Provider } from "mobx-react";

import PlayersStore from "./stores/PlayersStore";
import FranchiseStore from "./stores/FranchiseStore";
import LobbyStore from "./stores/LobbyStore";

const playersStore = new PlayersStore();
const franchiseStore = new FranchiseStore();
const lobbyStore = new LobbyStore(playersStore, franchiseStore);

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Provider
        lobbyStore={lobbyStore}
        playersStore={playersStore}
        franchiseStore={franchiseStore}
      >
        <Router>
          <div className="container mx-auto h-full">
            <Route path="/create" component={CreateLobby} />
            <Route path="/join/:lobbyId" component={JoinLobby} />
            <Route path="/lobby/:lobbyId" component={Lobby} />
            <Route path="/franchise/:franchiseId" component={Franchise} />
          </div>
        </Router>
      </Provider>
    );
  }
}