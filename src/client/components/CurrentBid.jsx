import React from "react";
import { observer } from "mobx-react";

const CurrentBid = observer(({ lobby }) => (
  <div className="bg-green-100 text-center flex flex-col items-center justify-center h-full">
    <div>Current Bid</div>
    <div>${lobby.leadingBidAmount}</div>
  </div>
));

export default CurrentBid;
