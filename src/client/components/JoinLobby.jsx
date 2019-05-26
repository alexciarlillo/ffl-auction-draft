import React from "react";
import axios from "axios";

class JoinLobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {form: {email: "", franchise_name: ""}, submitting: false, joined: false, error: false};
  }

  _handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    })
  }

  _handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      submitting: true
    });

    try {
      const response = await axios.post(`/api/lobby/${this.props.match.params.lobbyId}/join`, this.state.form);

      this.setState({
        submitting: false,
        joined: true
      });

    } catch (err) {
      this.setState({
        error: true
      });
    }
  }

  render() {
    return (
      <div>
        {! this.state.created &&
          <form onSubmit={this._handleSubmit}>
            <label>Franchise Name:
              <input type="text" name="franchise_name" value={this.state.form.name} onChange={this._handleChange}/>
            </label>

            <label>Email:
              <input type="text" name="email" value={this.state.form.email} onChange={this._handleChange}/>
            </label>

            <button type="submit">Submit</button>
          </form>
        }

        { this.state.joined &&
          <h2>Franchise claimed. Check email for access link</h2>
        }

        { this.state.error &&
          <h2>An error occurred. Please try again. Lobby may be filled.</h2>
        }
      </div>
    );
  }
}

export default JoinLobby;
