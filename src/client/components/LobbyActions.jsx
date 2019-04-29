import React from "react";
import { observer } from "mobx-react";

const LobbyActions = observer(({ lobby }) => (
  <div className="bg-purple-100 flex flex-col p-4 justify-between h-full">
    <div className="flex flex-row">
      <button className="bg-yellow-400 text-grey-600 w-1/2">Bid $26</button>
      <button className="bg-gray-800 text-gray-100 w-1/2">Pass</button>
    </div>

    <div className="flex flex-row">
      <input type="number" value="44" className="w-1/2" />
      <button className="bg-gray-800 text-yellow-400 w-1/2">Bid $44</button>
    </div>
  </div>
));

export default LobbyActions;
