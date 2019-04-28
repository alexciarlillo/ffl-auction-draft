import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import MyFranchise from "./MyFranchise";
import Franchise from "./Franchise";

@observer
class FranchiseList extends React.Component {
  render() {
    return (
      <div>
        {this.props.store.franchises.length > 0 ? (
          <div>
            <MyFranchise franchise={this.props.store.franchises[0]} />

            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <ul>
                  {this.props.store.franchises
                    .slice(1, this.props.store.franchises.length)
                    .map(franchise => (
                      <Franchise franchise={franchise} key={franchise.id} />
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
  }
}

export default FranchiseList;
