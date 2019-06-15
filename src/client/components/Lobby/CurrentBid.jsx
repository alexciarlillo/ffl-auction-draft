import React from "react";
import { inject, observer } from "mobx-react";

@inject("lobbyStore")
@observer
class CurrentBid extends React.Component {
  render() {
    return (
      <div className="text-right align-top text-2xl text-gray-300">
        ${this.props.lobbyStore.leadingBidAmount}
      </div>
    );
  }
}

export default CurrentBid;
