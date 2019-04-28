import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Player from "./Player";

@observer
class PlayerList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.store.players.map(player => (
                        <Player player={player} key={player.id} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default PlayerList
