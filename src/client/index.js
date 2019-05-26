import React from "react";
import ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import CreateLobby from "./components/CreateLobby";
import JoinLobby from "./components/JoinLobby";
import Lobby from "./components/Lobby";
import Franchise from "./components/Franchise";

import "./app.css";
import { Provider } from "mobx-react";

import LobbyStore from "./stores/LobbyStore";
import PlayersStore from "./stores/PlayersStore";
import FranchiseStore from "./stores/FranchiseStore";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const playersStore = new PlayersStore();
const franchiseStore = new FranchiseStore();
const lobbyStore = new LobbyStore(playersStore, franchiseStore);

ReactDOM.render(
  <Provider
    lobbyStore={lobbyStore}
    playersStore={playersStore}
    franchiseStore={franchiseStore}
  >
    <Router>
      <Route path="/create" component={CreateLobby} />
      <Route path="/join/:lobbyId" component={JoinLobby} />
      <Route path="/lobby/:lobbyId" component={Lobby} />
      <Route path="/franchise/:franchiseId" component={Franchise} />
    </Router>
  </Provider>,
  document.getElementById("root")
);



module.hot.accept();
