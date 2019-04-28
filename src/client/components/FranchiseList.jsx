import React from "react";
import { inject, observer } from "mobx-react";

import MyFranchise from "./MyFranchise";
import FranchiseListItem from "./FranchiseListItem";

const FranchiseList = ({ franchisesStore }) => (
  <div>
    {franchisesStore.franchises.length > 0 ? (
      <div>
        <MyFranchise franchise={franchisesStore.franchises[0]} />

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <ul>
              {franchisesStore.franchises
                .slice(1, franchisesStore.franchises.length)
                .map(franchise => (
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

export default inject("franchisesStore")(observer(FranchiseList));
