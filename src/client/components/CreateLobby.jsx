import React from "react";
import axios from "axios";

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {form: {name: "", email: "", franchiseCount: 10, franchiseBudget: 100}, submitting: false, created: false, error: false};
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
      const response = await axios.post(`/api/lobby`, this.state.form);

      this.setState({
        submitting: false,
        created: true
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
            <label>Name:
              <input type="text" name="name" value={this.state.form.name} onChange={this._handleChange}/>
            </label>

            <label>Email:
              <input type="text" name="email" value={this.state.form.email} onChange={this._handleChange}/>
            </label>

            <label># Franchises:
              <input type="number" name="franchiseCount" value={this.state.form.franchiseCount} onChange={this._handleChange}/>
            </label>

            <label>Franchise Budget:
              <input type="number" name="budget" value={this.state.form.franchiseBudget} onChange={this._handleChange}/>
            </label>

            <button type="submit">Submit</button>
          </form>
        }

        { this.state.created &&
          <h2>Draft lobby created. Check email for access link</h2>
        }

        { this.state.error &&
          <h2>An error occurred. Please try again.</h2>
        }
      </div>
    );
  }
}

export default Lobby;
