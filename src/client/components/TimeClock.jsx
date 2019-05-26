import React from "react";
import { inject, observer } from "mobx-react";

@inject("lobbyStore")
@observer
class TimeClock extends React.Component {

  _pause = async () => {
    await this.props.lobbyStore.pauseClock();
  }

  _start = async () => {
    await this.props.lobbyStore.startClock();
  }

  _reset = async () => {
    await this.props.lobbyStore.resetClock();
  }

  render () {
    return (
      <div className="bg-red-100 flex flex-col justify-center items-center h-full">
        <div className="">
          {this.props.lobbyStore.minutes.toLocaleString("en", { minimumIntegerDigits: 2 })}:
          {this.props.lobbyStore.seconds.toLocaleString("en", { minimumIntegerDigits: 2 })}
        </div>
        <div className="flex flex-row justify-around w-full">
          <button className="bg-yellow-600 text-gray-100 w-1/3 mx-1" onClick={this._pause}> PAUSE </button>
          <button className="bg-green-600 text-gray-100 w-1/3 mx-1" onClick={this._start}> START </button>
          <button className="bg-red-800 text-gray-100 w-1/3 mx-1" onClick={this._reset}> RESET </button>
        </div>
      </div>
    )
  }
}

export default TimeClock;
