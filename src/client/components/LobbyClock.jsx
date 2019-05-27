import React from "react";
import { inject, observer } from "mobx-react";

@inject("lobbyStore")
@observer
class LobbyClock extends React.Component {

  render () {
    return (
      <div className="text-right align-top font-mono text-yellow-500 text-2xl">
        {this.props.lobbyStore.minutes.toLocaleString("en", { minimumIntegerDigits: 2 })}:
        {this.props.lobbyStore.seconds.toLocaleString("en", { minimumIntegerDigits: 2 })}
      </div>
    )
  }
}

export default LobbyClock;
