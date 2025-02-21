import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/index.css";
import { useEffect, useState } from "react";
import { login, LoginResult } from "../api";

const LoginForm = () => {
  interface Errors {
    username?: string;
    password?: string;
    serverError?: string;
  }

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async () => {
    let newErrors: Errors = {};

    if (username.length === 0) {
      newErrors.username = "Username must not be empty";
    }
    if (password.length === 0) {
      newErrors.password = "Password must not be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const loginResult = await login(username, password);
    if (loginResult === LoginResult.INVALID_CREDENTIALS) {
      newErrors.username = "Username or password invalid";
    }
    if (loginResult === LoginResult.SERVER_ERROR) {
      newErrors.serverError =
        "An error occurred while processing your request. Please try again later.";
    }
    if (loginResult === LoginResult.SUCCESS) {
      navigate("/feed");
      return;
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setNotification(Object.values(errors).join("\n"));
    } else {
      setNotification("");
    }
  }, [errors]);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
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

        <Form.Group className="mb-3">
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
            <Button variant="secondary" type="button" onClick={handleSubmit}>
              Log In
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
              {notification.split("\n").map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginForm;
