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

store.addPlayer("Baker Mayfield");
store.addPlayer("OBJ");

setTimeout(() => {
  store.addPlayer("Nick Chubb");
}, 2000);

module.hot.accept();
