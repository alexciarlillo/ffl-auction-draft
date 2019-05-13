import React from "react";
import { inject, observer } from "mobx-react";

import PlayerList from "./PlayerList";
import FranchiseList from "./FranchiseList";
import LobbyDetails from "./LobbyDetails";

@inject("lobbyStore")
@observer
class Lobby extends React.Component {
  async componentDidMount() {
    let res = await fetch(`/api/lobby/${this.props.match.params.lobbyId}`, {
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("jwt")
      })
    });

    console.log(res);

    if (res.ok) {
      let data = await res.json();
      console.log(data);
    }
  }
  render() {
    return (
      <div>
        {/* <DevTools /> */}
        <LobbyDetails />
        <h1>{localStorage.getItem("jwt")}</h1>
        <div className="flex justify-around">
          <FranchiseList />
          <PlayerList />
        </div>
      </div>
    );
  }
}

export default Lobby;
