import React from "react";
import { inject, observer } from "mobx-react";

import MyFranchise from "./MyFranchise";
import FranchiseListItem from "./FranchiseListItem";

const FranchiseList = ({ lobbyStore, franchiseStore }) => (
  <div>
    {lobbyStore.franchises.length > 0 ? (
      <div>
        <MyFranchise franchise={franchiseStore.franchise} />

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <ul>
              {lobbyStore.franchises.map(franchise => (
                  <FranchiseListItem franchise={franchise} key={franchise.id} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <h2>Loading franchises...</h2>
    )}
  </div>
);

export default inject("lobbyStore", "franchiseStore")(observer(FranchiseList));
