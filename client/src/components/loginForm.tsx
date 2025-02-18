import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/index.css";
import { useState } from "react";
import { login } from "../api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userOrEmail, setUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "userOrEmail") setUserOrEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const isLoggedIn = await login(userOrEmail, password);
      if (isLoggedIn) {
        navigate("/feed"); // Navigate to the feed page on successful login
      } else {
        setNotification("Wrong username/email or password");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username or email"
            name="userOrEmail"
            value={userOrEmail}
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