import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'mobx-react';
import {library} from '@fortawesome/fontawesome-svg-core';

import {faAward, faStar} from '@fortawesome/pro-regular-svg-icons';

import CreateLobby from './components/CreateLobby';
import JoinLobby from './components/JoinLobby';
import Lobby from './components/Lobby';
import ClaimFranchise from './components/ClaimFranchise';

import PlayersStore from './stores/PlayersStore';
import FranchiseStore from './stores/FranchiseStore';
import LobbyStore from './stores/LobbyStore';

const playersStore = new PlayersStore();
const franchiseStore = new FranchiseStore();
const lobbyStore = new LobbyStore(playersStore, franchiseStore);

library.add(faAward);
library.add(faStar);

export default class App extends React.Component {
  render() {
    return (
      <Provider lobbyStore={lobbyStore} playersStore={playersStore} franchiseStore={franchiseStore}>
        <Router>
          <div className="container mx-auto h-full">
            <Route path="/create" component={CreateLobby} />
            <Route path="/join/:lobbyId" component={JoinLobby} />
            <Route path="/franchise/:franchiseId" component={ClaimFranchise} />
            <Route path="/lobby/:lobbyId" component={Lobby} />
          </div>
        </Router>
      </Provider>
    );
  }
}
