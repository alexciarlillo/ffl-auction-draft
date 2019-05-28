import React from "react";
import axios from "axios";

class CreateLobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        email: "",
        franchiseCount: "",
        franchiseBudget: ""
      },
      submitting: false,
      created: false,
      error: false
    };
  }

  _handleChange = async event => {
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
      await axios.post(`/api/lobby`, this.state.form);

      this.setState({
        submitting: false,
        created: true
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
              <span className="text-gray-700">Lobby/League Name</span>
              <input
                className="form-input mt-1 block w-full"
                type="text"
                name="name"
                value={this.state.form.name}
                onChange={this._handleChange}
                maxLength="200"
                required
              />
            </label>

            <label className="block py-4">
              <span className="text-gray-700">Your Email</span>
              <input
                className="form-input mt-1 block w-full"
                type="email"
                name="email"
                value={this.state.form.email}
                onChange={this._handleChange}
                placeholder="frodo@theshire.com"
                maxLength="200"
                required
              />
            </label>

            <label className="block py-4">
              <span className="text-gray-700">Number of Franchises</span>
              <input
                className="form-input mt-1 block w-full"
                type="number"
                name="franchiseCount"
                value={this.state.form.franchiseCount}
                onChange={this._handleChange}
                min="6"
                max="16"
                step="2"
                placeholder="10"
                required
              />
            </label>

            <label className="block py-4">
              <span className="text-gray-700">Franchise Budget</span>
              <input
                className="form-input mt-1 block w-full"
                type="number"
                name="franchiseBudget"
                value={this.state.form.franchiseBudget}
                onChange={this._handleChange}
                min="100"
                max="1000"
                step="1"
                placeholder="200"
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

        {this.state.created && (
          <h2>Draft lobby created. Check email for access link</h2>
        )}

        {this.state.error && <h2>An error occurred. Please try again.</h2>}
      </div>
    );
  }
}

export default CreateLobby;
