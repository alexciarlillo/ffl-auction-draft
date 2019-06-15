import React from 'react';
import {inject, observer} from 'mobx-react';

import PlayerListItem from './PlayerListItem';

const PlayerList = ({playersStore}) => (
  <div className="bg-gray-300 h-full p-2">
    {playersStore.loading ? (
      <h1>Loading players...</h1>
    ) : (
      <div className="h-full flex flex-col">
        <input
          type="text"
          className="form-input mt-1 block w-full mb-4"
          placeholder="Search Players"
        />
        <div className="h-full shadow-inner">
          <ul className="h-full overflow-y-scroll">
            {playersStore.players.map(player => (
              <PlayerListItem player={player} key={player.id} />
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

export default inject('playersStore')(observer(PlayerList));
