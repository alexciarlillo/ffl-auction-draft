import React from 'react';
import {observer} from 'mobx-react';
import BidActions from './BidActions';

@observer
class LobbyActions extends React.Component {
  render() {
    return (
      <div className="bg-gray-700 flex flex-col p-2 justify-between h-full w-full">
        <BidActions />
      </div>
    );
  }
}

export default LobbyActions;
