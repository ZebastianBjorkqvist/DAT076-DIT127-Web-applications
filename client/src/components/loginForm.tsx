import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/index.css";
import { useState } from "react";
import { login } from "../api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login(username, password);
      navigate("/feed"); // Navigate to the feed page on successful login
    } catch (error) {
      setNotification("Wrong username or password");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2 justify-content-md-end">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button variant="secondary" type="submit">
              Login
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => navigate("/newUser")}
            >
              Create user
            </Button>
          </div>
          {notification && (
            <div className="alert alert-danger mt-3" role="alert">
              {notification}
            </div>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginForm;
