import React from "react";
import { inject, observer } from "mobx-react";

const AuctionStatus = ({ lobbyStore }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      {/* <div>On the block: {store.player.name}</div> */}
      <div>Time remaining: {lobbyStore.clock}</div>
      <div>
        Leading Bid: {lobbyStore.leadingFranchise.name} @ $
        {lobbyStore.leadingBidAmount}
      </div>
    </div>
  </div>
);

export default inject("lobbyStore")(observer(AuctionStatus));
