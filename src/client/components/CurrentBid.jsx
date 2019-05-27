import React from "react";
import { inject, observer } from "mobx-react";

@inject("lobbyStore")
@observer
class CurrentBid extends React.Component {

  render() {
    return (
      <div className="bg-gray-200 rounded-full flex flex-col items-center justify-center w-16 h-16">
        <div className="text-center text-xl text-gray-700">${this.props.lobbyStore.leadingBidAmount}</div>
      </div>
    );
  }
}

export default CurrentBid;
