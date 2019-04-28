import React, { Component } from "react";
import { observer } from "mobx-react";

const MyFranchise = observer(({ franchise }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{franchise.name}</div>
      <p className="text-gray-700 text-base">
        ${franchise.budget} Remaining Budget
      </p>
    </div>
    <ol className="px-6 py-4">
      <li>Bakery Mayfield (QB) - $25</li>
      <li>Nuck Chubb (RB) - $25</li>
    </ol>
  </div>
));

export default MyFranchise;
