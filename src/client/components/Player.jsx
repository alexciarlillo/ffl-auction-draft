import React from "react";
import { observer } from "mobx-react";

const Player = observer(({ player }) => (
    <li>{player.name}</li>
));

export default Player;