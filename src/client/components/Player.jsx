import React from "react";
import { observer } from "mobx-react";

const Player = observer(({ player }) => (
  <li>
    {player.name} - {player.team} - {player.position}
  </li>
));

export default Player;
