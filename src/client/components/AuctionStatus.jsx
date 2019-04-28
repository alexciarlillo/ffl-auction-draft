import React, { Component } from "react";
import { observer } from "mobx-react";

const AuctionStatus = observer(({ store }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      {/* <div>On the block: {store.player.name}</div> */}
      <div>Time remaining: {store.clock}</div>
      <div>
        Leading Bid: {store.leadingFranchise.name} @ ${store.leadingBidAmount}
      </div>
    </div>
  </div>
));

export default AuctionStatus;
