import React from "react";
import ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import PlayerListModel from "./models/PlayerListModel";
import FranchiseListModel from "./models/FranchiseListModel";

import PlayerList from "./components/PlayerList";
import MyFranchise from "./components/MyFranchise";
import FranchiseList from "./components/FranchiseList";

import "./app.css";

const playerStore = new PlayerListModel();
const franchiseStore = new FranchiseListModel();

ReactDOM.render(
  <div>
    <DevTools />

    <div className="container p-6">
      <div className="flex justify-around">
        <FranchiseList store={franchiseStore} />
        <PlayerList store={playerStore} />
      </div>
    </div>
  </div>,
  document.getElementById("root")
);

playerStore.loadPlayers();

franchiseStore.addFranchise("Alex's Team", 200);
franchiseStore.addFranchise("Sean's Team", 180);
franchiseStore.addFranchise("Mike's Team", 150);
franchiseStore.addFranchise("Tom's Team", 175);

module.hot.accept();
