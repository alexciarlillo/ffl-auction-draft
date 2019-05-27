import React from "react";
import { inject, observer } from "mobx-react";
import CurrentPlayer from "./CurrentPlayer";
import CurrentBid from "./CurrentBid";
import LobbyActions from "./LobbyActions";
import LobbyClock from "./LobbyClock";


class LobbyDetails extends React.Component {

  render() {
    return (
      <div className="w-full overflow-hidden shadow-lg text-base">
        <div className="flex flex-row bg-gray-800 p-2 h-full justify-start w-full">
            <div className="w-2/5">
              <CurrentPlayer />
            </div>

            <div className="w-1/5">
              <CurrentBid />
            </div>
            <div className="w-2/5">
              <LobbyClock />
            </div>
        </div>
        <div className="w-full h-20 flex flex-row justify-center">
          <LobbyActions />
        </div>
      </div>
    );
  }
}

export default LobbyDetails;
