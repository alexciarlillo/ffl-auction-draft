import React from "react";
import ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import playersStore from "./models/PlayersStore";
import franchisesStore from "./models/FranchisesStore";
import AuctionModel from "./models/AuctionModel";

import PlayerList from "./components/PlayerList";
import FranchiseList from "./components/FranchiseList";
import AuctionStatus from "./components/AuctionStatus";

import "./app.css";

const auctionStore = new AuctionModel(60, 2);

ReactDOM.render(
  <div>
    <DevTools />

    <div className="container p-6">
      <div className="flex justify-around">
        <FranchiseList store={franchisesStore} />
        <AuctionStatus store={auctionStore} />
        <PlayerList store={playersStore} />
      </div>
    </div>
  </div>,
  document.getElementById("root")
);

playersStore.loadPlayers();

franchisesStore.addFranchise("Alex's Team", 200);
franchisesStore.addFranchise("Sean's Team", 180);
franchisesStore.addFranchise("Mike's Team", 150);
franchisesStore.addFranchise("Tom's Team", 175);

auctionStore.startClock();

module.hot.accept();
