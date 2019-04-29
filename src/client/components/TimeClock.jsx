import React from "react";
import { observer } from "mobx-react";

const TimeClock = observer(({ lobby }) => (
  <div className="bg-red-100 flex flex-row justify-center items-center h-full">
    <div className="">
      {lobby.minutes.toLocaleString("en", { minimumIntegerDigits: 2 })}:
      {lobby.seconds.toLocaleString("en", { minimumIntegerDigits: 2 })}
    </div>
  </div>
));

export default TimeClock;
