import React from "react";
import { observer } from "mobx-react";

const PlayerListItem = observer(({ player }) => (
  <li className="text-gray-700 bg-gray-200 p-4 text-xl">
    {player.name} - {player.team} - {player.position}
  </li>
));

export default PlayerListItem;
