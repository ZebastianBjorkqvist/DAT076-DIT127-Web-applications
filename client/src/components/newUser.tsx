import { Component } from "react";
export default class NewUser extends Component {
  render() {
    return (
      <>
      
        <form>
          <h3>Create user</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
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
      </>
    );
  }
}
