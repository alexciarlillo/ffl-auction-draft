import React from "react";
import { observer } from "mobx-react";

@observer
class Franchise extends React.Component {
  async componentDidMount() {
    let res = await fetch(
      `/api/franchise/${this.props.match.params.claimToken}`
    );

    if (res.ok) {
      let data = await res.json();
      localStorage.setItem("jwt", data.token);
      console.log(data);
      this.props.history.push(`/lobby/${data.lobby_id}`);
    }
  }

  render() {
    return (
      <div>
        <h1>Authenticating...</h1>
      </div>
    );
  }
}

export default observer(Franchise);
