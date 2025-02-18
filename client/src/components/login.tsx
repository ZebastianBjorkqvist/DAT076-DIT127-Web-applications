import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <form>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Username or email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username or email"
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={() => navigate('/feed')}>
            Login
          </button>
        </div>
      </form>
      <a href="/newUser">Create a new account</a>
    </>
  );
};

export default Login;
