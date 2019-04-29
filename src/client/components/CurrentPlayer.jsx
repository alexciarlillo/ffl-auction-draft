import React from "react";
import { observer } from "mobx-react";

const CurrentPlayer = observer(({ player }) => (
  <div className="bg-blue-100 flex flex-col items-center justify-center h-full">
    <div className="text-center">Baker Mayfield</div>
    <div className="text-gray-600 text-center">
      QB <span className="font-italic">CLE</span>
    </div>
  </div>
));

export default CurrentPlayer;
