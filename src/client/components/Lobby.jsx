import React from "react";
import { inject, observer } from "mobx-react";
import axios from 'axios';

import PlayerList from "./PlayerList";
import FranchiseList from "./FranchiseList";
import LobbyDetails from "./LobbyDetails";

@inject("lobbyStore")
@observer
class Lobby extends React.Component {
  async componentDidMount() {

    try {
      const response = await axios.get(`/api/lobby/${this.props.match.params.lobbyId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("jwt")}`}
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }


    // setup sock
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
