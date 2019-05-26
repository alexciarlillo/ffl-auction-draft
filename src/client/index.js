import React from "react";
import ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import CreateLobby from "./components/CreateLobby";
import Lobby from "./components/Lobby";
import Franchise from "./components/Franchise";

import "./app.css";
import { Provider } from "mobx-react";

import LobbyStore from "./stores/LobbyStore";
import PlayersStore from "./stores/PlayersStore";
import FranchisesStore from "./stores/FranchisesStore";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const playersStore = new PlayersStore();
const franchisesStore = new FranchisesStore();
const lobbyStore = new LobbyStore(playersStore, franchisesStore);

ReactDOM.render(
  <Provider
    lobbyStore={lobbyStore}
    playersStore={playersStore}
    franchisesStore={franchisesStore}
  >
    <Router>
      <Route path="/create" component={CreateLobby} />
      <Route path="/lobby/:lobbyId" component={Lobby} />
      <Route path="/franchise/:franchiseId" component={Franchise} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

franchisesStore.addFranchise("Alex's Team", 200);
franchisesStore.addFranchise("Sean's Team", 180);
franchisesStore.addFranchise("Mike's Team", 150);
franchisesStore.addFranchise("Tom's Team", 175);

lobbyStore.reset();
lobbyStore.startClock();
lobbyStore.makeBid(25);

module.hot.accept();
