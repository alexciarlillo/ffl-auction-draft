import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Player from "./Player";

@observer
class PlayerList extends React.Component {
  render() {
    return (
      <div>
        {this.props.store.loading ? (
          <h1>Loading players...</h1>
        ) : (
          <div>
            <h1>
              Showing {this.props.store.activePlayers.length} active of{" "}
              {this.props.store.players.length} total players
            </h1>
            <ul>
              {this.props.store.activePlayers.map(player => (
                <Player player={player} key={player.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default PlayerList;
