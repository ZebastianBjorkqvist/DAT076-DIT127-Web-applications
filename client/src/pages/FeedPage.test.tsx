import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import FeedPage from "./FeedPage";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api";

//Mock-API
jest.mock("../api", () => ({
    getPosts: jest.fn(), 
}));

//Mock-navigate
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));
const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate); //to change the type of the mock to a function, prevents errors


describe("Navigation works from the feed page", () => {
    test("Create Post button navigates to new post page", () => {
        render(
          <MemoryRouter>
            <FeedPage />
          </MemoryRouter>
        );
    
        // Find the button for creating a post
        const createPostButton = screen.getByTestId("create-post-btn");

        // Click the button
        fireEvent.click(createPostButton);

        // Wait for navigation to be triggered
        waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/newPost");
      });

    });

    test("Navbar sign out button navigates to log in page", () => {
        render(
            <MemoryRouter>
              <FeedPage />
            </MemoryRouter>
          );
      
          // Find the button for creating a post
          const LogoButton = screen.getByTestId("logo-btn");
  
          // Click the button
          fireEvent.click(LogoButton);
  
          // Wait for navigation to be triggered
          waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith("/feed");
        });

    })

    test("Navbar logo button reloads feedpage", () => {
        render(
            <MemoryRouter>
              <FeedPage />
            </MemoryRouter>
          );
      
          // Find the button for creating a post
          const ProfileButton = screen.getByTestId("profile-btn");
  
          // Click the button
          fireEvent.click(ProfileButton);
  
          // Wait for navigation to be triggered
          waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith("/feed");
        });
        
    })

    test("Navbar profile button navigates to profile page", () => {
        render(
            <MemoryRouter>
              <FeedPage />
            </MemoryRouter>
          );
      
          // Find the button for creating a post
          const LogOutButton = screen.getByTestId("log-out-btn");
  
          // Click the button
          fireEvent.click(LogOutButton);
  
          // Wait for navigation to be triggered
          waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith("./");
        });
    })


})



describe("FeedPage Rendering Tests", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("Checks rendering of feedpage when the post-connection works", async () => {
    const mockPosts = [
      { title: "First Post", text: "This is the first post" },
      { title: "Second Post", text: "This is the second post" },
    ];

    (getPosts as jest.Mock).mockResolvedValueOnce(mockPosts);

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome to the feed!")).toBeInTheDocument();

    // Wait for posts to be loaded
    await waitFor(() => {
      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.getByText("This is the first post")).toBeInTheDocument();
      expect(screen.getByText("Second Post")).toBeInTheDocument();
      expect(screen.getByText("This is the second post")).toBeInTheDocument();
    });
  });

  test("correct handling of API error for rendering feedpage", async () => {
    (getPosts as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    // a mock thing so that we can use the console output
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );


    await waitFor(() => {
      expect(screen.getByText("Welcome to the feed!")).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to load posts:", expect.any(Error));
    });

    // removing the spy thing
    consoleErrorSpy.mockRestore();
  });

});







