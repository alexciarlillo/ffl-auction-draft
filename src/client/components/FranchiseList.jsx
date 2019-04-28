import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import MyFranchise from "./MyFranchise";

@observer
class FranchiseList extends React.Component {
  render() {
    return (
      <div>
        {this.props.store.franchises.length > 0 ? (
          <div>
            <MyFranchise franchise={this.props.store.franchises[0]} />

            <ul>
              {this.props.store.franchises
                .slice(1, this.props.store.franchises.length)
                .map(franchise => (
                  <li key={franchise.id}>
                    {franchise.name} - {franchise.budget}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <h2>Loading franchises...</h2>
        )}
      </div>
    );
  }
}

export default FranchiseList;
