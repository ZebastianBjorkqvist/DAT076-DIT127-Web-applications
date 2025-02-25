import {

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
jest.mock("axios");
  //const mockedAxios = axios as jest.Mocked<typeof axios>;
  
  //Mock-API
jest.mock("../api", () => ({
    checkAuth: jest.fn(),
    createPost: jest.fn(),
}));


//Mock-navigate

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

  


describe("Create User", () => {

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

    test("Navbar logo button reloads feedpage", () => {
        render(
            <MemoryRouter>
              <CreateUser />
            </MemoryRouter>
          );
      
          // Find the button for creating a post
          const LoginButton = screen.getByTestId("login-btn");
          
  
          // Click the button
          fireEvent.click(LoginButton);
  
          // Wait for navigation to be triggered
          waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith("./");
        });

    })

});