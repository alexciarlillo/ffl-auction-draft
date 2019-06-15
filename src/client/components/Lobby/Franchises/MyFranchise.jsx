import React from 'react';
import {observer} from 'mobx-react';

const MyFranchise = observer(({franchise}) => (
  <div className="w-full border-b border-gray-700 p-4">
    <div>
      <div className="font-bold text-xl mb-2">{franchise.name}</div>
      <p className="text-gray-700 text-base">${franchise.remaining_budget} Remaining Budget</p>
    </div>
    <ol>
      <li>Bakery Mayfield (QB) - $25</li>
      <li>Nuck Chubb (RB) - $25</li>
    </ol>
  </div>
));

export default MyFranchise;
