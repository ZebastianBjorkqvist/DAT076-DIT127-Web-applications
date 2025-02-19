import React, { useState } from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUser(email, password, username);
      setEmail("");
      setUsername("");
      setPassword("");
      setNotification("User created successfully!");
      navigate("/");
    } catch (error) {
      setNotification("Failed to create user. Please try again.");
      console.error("Failed to create user:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Create user</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
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
      {notification && (
        <div className="alert alert-info mt-3" role="alert">
          {notification}
        </div>
      )}
    </>
  );
};

export default CreateUserForm;
