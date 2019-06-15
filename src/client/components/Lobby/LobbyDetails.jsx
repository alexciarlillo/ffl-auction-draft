import React from 'react';
import {observer, inject} from 'mobx-react';
import CurrentPlayer from './CurrentPlayer';
import CurrentBid from './CurrentBid';
import LobbyClock from './LobbyClock';
import moment from 'moment';

@inject('lobbyStore')
@observer
class LobbyDetails extends React.Component {
  render() {
    const {start_at, started_at} = this.props.lobbyStore.lobbyInfo;

    return (
      <div className="w-full overflow-hidden text-base">
        {started_at ? (
          <div className="flex flex-row bg-gray-800 p-2 h-full justify-start w-full">
            <div className="w-3/5">
              <CurrentPlayer />
            </div>
            <div className="w-2/5 flex flex-col">
              <LobbyClock />
              <CurrentBid />
            </div>
          </div>
        ) : (
          <div className="flex flex-row bg-gray-800 p-2 h-full justify-start w-full">
            Draft Start: {moment(start_at).format('llll')}
          </div>
        )}
      </div>
    );
  }
}

export default LobbyDetails;
