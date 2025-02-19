import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
import { render, screen } from "@testing-library/react";
import LoginForm from "./loginForm";
import { MemoryRouter } from "react-router-dom";
jest.mock("axios");

describe("loginForm", () => {
  it("renders form correctly", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const createButton = screen.getByRole("button", { name: "Create user" });
    expect(createButton).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
    const usernameField = screen.getByRole("textbox", { name: "" });
    expect(usernameField).toBeInTheDocument();
    const pwdField = screen.getByLabelText("Password");
    expect(pwdField).toBeInTheDocument();
  });

  it("logs an existing user in", () => {});

  it("logs rejects an incorrect password", () => {});

  it("logs rejects an invalid user", () => {});

  it("logs rejects an incorrect password and an incorrect user in the same way", () => {});
});
