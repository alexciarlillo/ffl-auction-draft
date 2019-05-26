import React from "react";
import { inject, observer } from "mobx-react";
import axios from 'axios';

import PlayerList from "./PlayerList";
import FranchiseList from "./FranchiseList";
import LobbyDetails from "./LobbyDetails";

@inject("lobbyStore")
@observer
class Lobby extends React.Component {

  constructor() {
    super();

    this.socket = null;
  }

  async componentDidMount() {

    try {
      const response = await axios.get(`/api/lobby/${this.props.match.params.lobbyId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
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
      <div>
        {/* <DevTools /> */}
        <LobbyDetails />
        <div className="flex justify-around">
          <FranchiseList />
          <PlayerList />
        </div>
      </div>
    );
  }
}

export default Lobby;
