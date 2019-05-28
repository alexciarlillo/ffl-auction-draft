import React from "react";
import { computed } from "mobx";
import { observer, inject } from "mobx-react";

@inject("lobbyStore")
@observer
class BidActions extends React.Component {
  @computed get customBidDisabled() {
    const { lobbyStore } = this.props;

    return lobbyStore.customBidAmount < lobbyStore.minimumBidAmount;
  }

  render() {
    const { lobbyStore } = this.props;

    return (
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row">
          <input
            type="number"
            value={this.props.lobbyStore.customBidAmount}
            onChange={event => {
              lobbyStore.setCustomBid(event.target.value);
            }}
            className="form-input block w-1/5 text-xl text-center"
          />
          <button
            className={`bg-red-600 w-2/5 rounded mx-1 flex flex-row justify-start px-4 items-center ${
              this.customBidDisabled ? "opacity-50 cursor-not-allowed" : null
            }`}
            onClick={event => lobbyStore.submitCustomBid()}
            disabled={this.customBidDisabled}
          >
            <div className="text-gray-400 text-sm uppercase">Bid</div>
            <div className="text-gray-800 text-xl uppercase ml-6">
              ${this.props.lobbyStore.customBidAmount}
            </div>
          </button>

          <button
            className="bg-yellow-400 px-4 py-2 w-2/5 rounded flex flex-row justify-start px-4 items-center"
            onClick={event => lobbyStore.submitMinimumBid()}
          >
            <div className="text-gray-600 text-sm uppercase">Min</div>
            <span className="text-gray-800 text-xl uppercase ml-6">
              ${this.props.lobbyStore.minimumBidAmount}
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default BidActions;
