import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginPage from "./LoginPage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("LoginPage", () => {
  beforeEach(() => {});

  it("renders form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const loginButton = screen.getByRole("button", { name: "Login" });
    const usernameField = screen.getByRole("textbox", { name: "" });
    const pwdField = screen.getByLabelText("Password");
    const createButton = screen.getByRole("button", { name: "Create user" });

    expect(createButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(usernameField).toBeInTheDocument();
    expect(pwdField).toBeInTheDocument();
  });

  it("sends correct login data to backend", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const loginButton = screen.getByRole("button", { name: "Login" });
    const usernameField = screen.getByRole("textbox", { name: "" });
    const pwdField = screen.getByLabelText("Password");
    await act(async () => {
      fireEvent.change(await usernameField, { target: { value: "zeb" } });
      fireEvent.change(await pwdField, { target: { value: "123" } });
      fireEvent.click(await loginButton);
    });

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
