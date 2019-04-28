import React from "react";
import { inject, observer } from "mobx-react";

import PlayerListItem from "./PlayerListItem";

const PlayerList = ({ playersStore }) => (
  <div>
    {playersStore.loading ? (
      <h1>Loading players...</h1>
    ) : (
      <div>
        <ul>
          {playersStore.players.map(player => (
            <PlayerListItem player={player} key={player.id} />
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default inject("playersStore")(observer(PlayerList));
