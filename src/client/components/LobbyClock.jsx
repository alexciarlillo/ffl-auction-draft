import React from "react";
import { inject, observer } from "mobx-react";

@inject("lobbyStore")
@observer
class LobbyClock extends React.Component {

  render () {
    return (
      <div className="flex flex-row justify-center items-center font-mono text-gray-700 text-4xl bg-yellow-500 p-2">
        {this.props.lobbyStore.minutes.toLocaleString("en", { minimumIntegerDigits: 2 })}:
        {this.props.lobbyStore.seconds.toLocaleString("en", { minimumIntegerDigits: 2 })}
      </div>
    )
  }
}

export default LobbyClock;
