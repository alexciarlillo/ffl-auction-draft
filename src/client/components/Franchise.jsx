import React from "react";
import { observer } from "mobx-react";

const Franchise = observer(({ franchise }) => (
  <li>
    {franchise.name} - ${franchise.budget}
  </li>
));

export default Franchise;
