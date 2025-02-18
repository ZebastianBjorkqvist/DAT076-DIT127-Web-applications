import { Component } from "react";
import { createUser } from "../api";
export default class NewUser extends Component {

  state = {
    email: "",
    username: "",
    password: "",
    notification:""
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUser(this.state.email, this.state.username, this.state.password);
      this.setState({email:"", username:"", password:"",notification: "User created successfully!"})
    } catch (error) {
      this.setState({
        notification: "Failed to create user. Please try again.", // Set error message
      });
      console.error("Failed to create user:", error);
    }
  };
  
  render() {
    return (
      <>
      
        <form onSubmit={this.handleSubmit}>
          <h3>Create user</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Create user
            </button>
          </div>
        </form>
        <div>
          Already have an account? <a href="/">Login here</a>
        </div>
        {this.state.notification && (
          <div className="alert alert-info mt-3" role="alert">
            {this.state.notification}
          </div>
        )}
      </>
    );
  }
}
