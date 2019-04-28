import { observer } from "mobx-react";

const PlayerListItem = observer(({ player }) => (
  <li>
    {player.name} - {player.team} - {player.position}
  </li>
));

export default PlayerListItem;
