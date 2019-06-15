import React from 'react';
import {observer} from 'mobx-react';
import CurrentPlayer from './CurrentPlayer';
import CurrentBid from './CurrentBid';
import LobbyClock from './LobbyClock';

@observer
class LobbyDetails extends React.Component {
  render() {
    return (
      <div className="w-full overflow-hidden text-base">
        <div className="flex flex-row bg-gray-800 p-2 h-full justify-start w-full">
          <div className="w-3/5">
            <CurrentPlayer />
          </div>
          <div className="w-2/5 flex flex-col">
            <LobbyClock />
            <CurrentBid />
          </div>
        </div>
      </div>
    );
  }
}

export default LobbyDetails;
