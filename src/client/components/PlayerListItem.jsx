import React from 'react';
import {observer} from 'mobx-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const PlayerListItem = observer(({player}) => (
  <li className="text-gray-700 bg-gray-100 p-4">
    <div className="flex flex-row justify-between items-center">
      <div>
        <div className="text-xl">{player.name}</div>
        <div className="text-md">
          <span className="font-bold">{player.position}</span>
          <span className="text-gray-600 ml-2">{player.team}</span>
        </div>
      </div>
      <div className="flex flex-row text-3xl">
        <FontAwesomeIcon className="" icon={['far', 'award']} />
        <FontAwesomeIcon className="ml-3" icon={['far', 'star']} />
      </div>
    </div>
  </li>
));

export default PlayerListItem;
