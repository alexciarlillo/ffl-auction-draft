import React from "react";
import { observer, inject } from "mobx-react";

@inject("lobbyStore")
@observer
class AdminActions extends React.Component {
  _pause = async () => {
    await this.props.lobbyStore.pauseClock();
  };

  _start = async () => {
    await this.props.lobbyStore.startClock();
  };

  _reset = async () => {
    await this.props.lobbyStore.resetClock();
  };

  render() {
    return (
      <div className="flex flex-row justify-around w-full">
        <button
          className="bg-yellow-600 text-gray-100 w-1/3 mx-1"
          onClick={this._pause}
        >
          {" "}
          PAUSE{" "}
        </button>
        <button
          className="bg-green-600 text-gray-100 w-1/3 mx-1"
          onClick={this._start}
        >
          {" "}
          START{" "}
        </button>
        <button
          className="bg-red-800 text-gray-100 w-1/3 mx-1"
          onClick={this._reset}
        >
          {" "}
          RESET{" "}
        </button>
      </div>
    );
  }
}

export default AdminActions;
