import React from "react";
import ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import PlayerList from "./components/PlayerList";
import FranchiseList from "./components/FranchiseList";
import LobbyDetails from "./components/LobbyDetails";

import "./app.css";
import { Provider } from "mobx-react";
import LobbyStore from "./stores/LobbyStore";
import PlayersStore from "./stores/PlayersStore";
import FranchisesStore from "./stores/FranchisesStore";

const playersStore = new PlayersStore();
const franchisesStore = new FranchisesStore();
const lobbyStore = new LobbyStore(playersStore, franchisesStore);

ReactDOM.render(
  <Provider
    lobbyStore={lobbyStore}
    playersStore={playersStore}
    franchisesStore={franchisesStore}
  >
    <div>
      {/* <DevTools /> */}
      <LobbyDetails />
      <div className="flex justify-around">
        <FranchiseList />
        <PlayerList />
      </div>
    </div>
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
