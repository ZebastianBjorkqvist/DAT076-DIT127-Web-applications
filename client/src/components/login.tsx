import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <form>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Username </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => navigate("/feed")}
          >
            Login
          </button>
        </div>
      </form>
      <a href="/newUser">Create a new account</a>
    </>
  );
};

export default Login;
