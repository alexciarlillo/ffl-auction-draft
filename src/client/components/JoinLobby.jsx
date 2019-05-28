import React from "react";
import axios from "axios";

class JoinLobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: { email: "", franchise_name: "" },
      submitting: false,
      joined: false,
      error: false
    };
  }

  _handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

  _handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      submitting: true
    });

    try {
      this.setState({
        submitting: false,
        joined: true
      });
    } catch (err) {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="md:mx-auto md:max-w-sm md:rounded md:overflow-hidden md:shadow-lg">
        {!this.state.created && (
          <form onSubmit={this._handleSubmit} className="w-full px-6 py-4">
            <label className="block py-4">
              <span className="text-gray-700">Franchise Name</span>
              <input
                className="form-input mt-1 block w-full"
                type="text"
                name="franchise_name"
                value={this.state.form.name}
                onChange={this._handleChange}
                maxLength="200"
                required
              />
            </label>

            <label className="block py-4">
              <span className="text-gray-700">Email</span>
              <input
                className="form-input mt-1 block w-full"
                type="email"
                name="email"
                value={this.state.form.email}
                onChange={this._handleChange}
                maxLength="200"
                required
              />
            </label>

            <div className="flex flex-row justify-end py-4">
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-1/3"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {this.state.joined && (
          <h2>Franchise claimed. Check email for access link</h2>
        )}

        {this.state.error && (
          <h2>An error occurred. Please try again. Lobby may be filled.</h2>
        )}
      </div>
    );
  }
}

export default JoinLobby;
