import React from "react";
import { inject, observer } from "mobx-react";

import PlayerList from "./PlayerList";
import FranchiseList from "./FranchiseList";
import LobbyDetails from "./LobbyDetails";

const Lobby = ({ lobbyStore }) => (
  <div>
    {/* <DevTools /> */}
    <LobbyDetails />
    <h1>{localStorage.getItem("jwt")}</h1>
    <div className="flex justify-around">
      <FranchiseList />
      <PlayerList />
    </div>
  </div>
);

export default inject("lobbyStore")(observer(Lobby));
