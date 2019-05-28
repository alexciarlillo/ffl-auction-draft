import React from 'react';
import {observer} from 'mobx-react';

const FranchiseListItem = observer(({franchise}) => (
  <li className="text-gray-700 bg-white p-4 border-b border-gray-200">
    {franchise.name} - ${franchise.remaining_budget}
  </li>
));

export default FranchiseListItem;
