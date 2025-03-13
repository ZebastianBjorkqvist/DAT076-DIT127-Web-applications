import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "../context/AuthContext";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("LoginPage", () => {
  beforeEach(() => {});

  it("renders form", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
    const loginButton = screen.getByRole("button", { name: "Log in" });
    const usernameField = screen.getByLabelText("Username");
    const pwdField = screen.getByLabelText("Password");
    const createButton = screen.getByRole("button", { name: "Create user" });

    expect(createButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(usernameField).toBeInTheDocument();
    expect(pwdField).toBeInTheDocument();
  });

  it("sends correct login data to backend", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
    const loginButton = screen.getByRole("button", { name: "Log in" });
    const usernameField = screen.getByLabelText("Username");
    const pwdField = screen.getByLabelText("Password");
    fireEvent.change(usernameField, { target: { value: "zeb" } });
    fireEvent.change(pwdField, { target: { value: "123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:8080/user/login",
        {
          username: "zeb",
          password: "123",
        }
      );
    });
  });
});
