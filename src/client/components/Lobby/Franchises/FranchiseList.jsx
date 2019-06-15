import React from 'react';
import {inject, observer} from 'mobx-react';

import MyFranchise from './MyFranchise';
import FranchiseListItem from './FranchiseListItem';

const FranchiseList = ({lobbyStore, franchiseStore}) => (
  <div className="bg-gray-300 h-full overflow-y-scroll">
    {lobbyStore.franchises.length > 0 ? (
      <div className="flex flex-col">
        <MyFranchise franchise={franchiseStore.franchise} />

        <div className="w-full p-2">
          <ul>
            {lobbyStore.franchises.map(franchise => (
              <FranchiseListItem franchise={franchise} key={franchise.id} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <h2>Loading franchises...</h2>
    )}
  </div>
);

export default inject('lobbyStore', 'franchiseStore')(observer(FranchiseList));
