import React from 'react';
import {inject, observer} from 'mobx-react';
import axios from 'axios';

import PlayerList from './PlayerList';
import FranchiseList from './FranchiseList';
import LobbyDetails from './LobbyDetails';
import LobbyActions from './LobbyActions';
import Tabs from './Tabs';

@inject('lobbyStore')
@observer
class Lobby extends React.Component {
  constructor() {
    super();

    this.socket = null;
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/api/lobby/${this.props.match.params.lobbyId}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      });

      this.props.lobbyStore.setFranchises(response.data.franchise, response.data.franchises);
      this.props.lobbyStore.setLobbyInfo(response.data.lobby);
    } catch (err) {
      console.log(err);
    }

    this.props.lobbyStore.establishSocket();
  }

  async componentWillUmount() {
    this.props.lobbyStore.disconnectSocket();
  }

  render() {
    return (
      <div className="bg-gray-100 flex flex-col flex-no-wrap items-stretch h-full">
        {/* <DevTools /> */}

        <div className="flex-none">
          <LobbyDetails />
        </div>

        <div className="flex-1">
          <Tabs>
            <FranchiseList label="Franchises" />
            <PlayerList label="Players" />
          </Tabs>
        </div>

        <div className="flex-none">
          <div className="w-full h-16 flex flex-row justify-center">
            <LobbyActions />
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
