import React from "react";
import { inject, observer } from "mobx-react";
import CurrentPlayer from "./CurrentPlayer";
import CurrentBid from "./CurrentBid";
import LobbyActions from "./LobbyActions";
import TimeClock from "./TimeClock";

const LobbyDetails = ({ lobbyStore }) => (
  <div className="w-full rounded overflow-hidden shadow-lg text-base h-20">
    <div className="flex flex-row justify-between items-stretch h-full">
      <div className="w-1/5">
        <CurrentPlayer />
      </div>

      <div className="w-1/5">
        <CurrentBid lobby={lobbyStore} />
      </div>

      <div className="w-2/5">
        <LobbyActions />
      </div>

      <div className="w-1/5">
        <TimeClock lobby={lobbyStore} />
      </div>
    </div>
  </div>
);

export default inject("lobbyStore")(observer(LobbyDetails));
