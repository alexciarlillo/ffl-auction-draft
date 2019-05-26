import React from "react";
import { observer } from "mobx-react";
import axios from "axios";
import * as qs from "query-string";

@observer
class Franchise extends React.Component {
  async componentDidMount() {
    const franchiseId = this.props.match.params.franchiseId;
    const claim = qs.parse(this.props.location.search);

    try {
      const response = await axios.post(`/api/franchise/${franchiseId}/claim`, claim);

      localStorage.setItem("jwt", response.data.token);
      this.props.history.push(`/lobby/${response.data.lobby.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h1>Authenticating franchise access...</h1>
      </div>
    );
  }
}

export default observer(Franchise);
