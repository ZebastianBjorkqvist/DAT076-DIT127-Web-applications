import {

    act,
    fireEvent,
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
  
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
//import { checkAuth } from "../api";

import CreateUser from "./CreateUser";
import { createUser } from "../api";
jest.mock("axios");
//const mockedAxios = axios as jest.Mocked<typeof axios>;
  
  //Mock-API
jest.mock("../api", () => ({
    checkAuth: jest.fn(),
    createUser: jest.fn(),
}));


//Mock-navigate

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

  


describe("Create User tests", () => {

    let mock: MockAdapter;

    beforeEach(() => {
      mock = new MockAdapter(axios);
      //(checkAuth as jest.Mock).mockResolvedValueOnce(true)
  
    });
  
    afterEach(() => {
      mock.reset();
    });


    test("renders form correctly", () => {
        render(
            <MemoryRouter>
                <CreateUser />
            </MemoryRouter>

        );

        // Check for input fields and buttons
        expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();

        expect(screen.getByTestId("create-user-btn"));
        expect(screen.getByTestId("login-btn"));

    });

    test("Login-button navigates correctly to login page", () => {
        render(
            <MemoryRouter>
              <CreateUser />
            </MemoryRouter>
          );
      
          // Find the link to the login page
          const LoginButton = screen.getByTestId("login-btn");
          
  
          // Click the button
          fireEvent.click(LoginButton);
  
          // Wait for navigation to be triggered
          waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith("./");
        });
    })

    test("handles creation of valid user correctly", async () => {
        render(
          <MemoryRouter>
            <CreateUser />
          </MemoryRouter>
        );

        const usernameField = (screen.getByPlaceholderText("Enter username"))
        const emailField = (screen.getByPlaceholderText("Enter email"))
        const passwordField = (screen.getByPlaceholderText("Enter password"))

        const createUserBtn = (screen.getByTestId("create-user-btn"));




        await act(async () => {
          fireEvent.change(await usernameField, { target: { value: "zeb" } });
          fireEvent.change(await passwordField, { target: { value: "123" } });
          fireEvent.change(await emailField, {target : {value: "hej@gmail.com" }})

        });

      (createUser as jest.Mock).mockResolvedValueOnce({ username: "zeb", password: "123", email: "hej@gmail.com" });
      fireEvent.click(createUserBtn);
    
      // Wait for navigation to be triggered
        waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith("./");
        });

      });

});