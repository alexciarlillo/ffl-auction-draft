import React from "react";
import { observer, inject } from "mobx-react";
import LobbyClock from "./LobbyClock";

@inject("playersStore")
@observer
class CurrentPlayer extends React.Component {
  render() {
    return (
      <div className="flex flex-col">
        <div className="text-gray-500 text-xs uppercase tracking-wider">
          Nominated
        </div>
        <div className="text-gray-200 block text-lg tracking-wider">
          Baker Mayfield
        </div>
        <div className="flex flex-row justify-start">
          <div className="text-gray-400">
            <span className="text-gray-500 text-xs uppercase tracking-wider">
              POS
            </span>{" "}
            <span>QB</span>
          </div>
          <div className="text-gray-400 pl-4">
            <span className="text-gray-500 text-xs uppercase tracking-wider">
              TEAM
            </span>{" "}
            <span>CLE</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentPlayer;
