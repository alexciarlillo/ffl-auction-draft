import React from "react";
import { observer } from "mobx-react";

const FranchiseListItem = observer(({ franchise }) => (
  <li>
    {franchise.name} - ${franchise.budget}
  </li>
));

export default FranchiseListItem;
