import React from "react";
import ReactDOM from "react-dom";
import DevTools from "mobx-react-devtools";

import Welcome from "./components/Welcome";
import PlayerList from "./components/PlayerList";
import PlayerListModel from "./models/PlayerListModel";

const store = new PlayerListModel();

ReactDOM.render(
  <div>
    <DevTools />
    <Welcome />
    <PlayerList store={store} />
  </div>,
  document.getElementById("root")
);

store.loadPlayers();

module.hot.accept();
