import React from "react";
import { observer } from "mobx-react";

const CurrentBid = observer(({ lobby }) => (
  <div className="bg-green-100 text-center flex flex-col items-center justify-center h-full">
    <div>Current Bid</div>
    <div>$25</div>
  </div>
));

export default CurrentBid;
