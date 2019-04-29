import React from "react";
import { observer, inject } from "mobx-react";

@inject("lobbyStore")
@observer
class LobbyActions extends React.Component {
  handleCustomBidChange(event) {
    console.log(event);
    this.props.lobbyStore.setCustomBid(event.target.value);
  }

  makeMinimumBid(event) {
    this.props.lobbyStore.makeBid(this.props.lobbyStore.minimumBidAmount);
  }

  render() {
    return (
      <div className="bg-purple-100 flex flex-col p-2 justify-between h-full">
        <div className="flex flex-row">
          <button
            className="bg-yellow-400 text-grey-600 w-1/2 mx-1"
            onClick={event => {
              this.makeMinimumBid(event);
            }}
          >
            Bid ${this.props.lobbyStore.minimumBidAmount}
          </button>
          <button className="bg-gray-800 text-gray-100 w-1/2 mx-1">Pass</button>
        </div>

        <div className="flex flex-row">
          <input
            type="number"
            value={this.props.lobbyStore.customBidAmount}
            onChange={event => {
              this.handleCustomBidChange(event);
            }}
            className="w-1/2 mx-1"
          />
          <button className="bg-gray-800 text-yellow-400 w-1/2 mx-1">
            Bid ${this.props.lobbyStore.customBidAmount}
          </button>
        </div>
      </div>
    );
  }
}

export default LobbyActions;
