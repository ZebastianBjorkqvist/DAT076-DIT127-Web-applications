import { render, screen, waitFor } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
import { checkAuth, getCurrentUser } from "../api";
import { MemoryRouter } from "react-router";

// Mock the API functions
jest.mock("../api", () => ({
    checkAuth: jest.fn(),
    getCurrentUser: jest.fn(),
}));

const mockUseAuth = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

//Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

//Mock timers
jest.useFakeTimers();

describe("Profile page", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });


    test("displays username and email when the user is authenticated", async () => {
        mockUseAuth.mockReturnValue({
            user: { id: "123", name: "Test User" },
            isAuthenticated: true,
          });
        (checkAuth as jest.Mock).mockResolvedValue(true);
        (getCurrentUser as jest.Mock).mockResolvedValue({
            username: "testuser",
            email: "testuser@example.com",
        });

        render(<MemoryRouter><ProfilePage /></MemoryRouter>);

        await waitFor(() => {
            expect(screen.getByText("testuser")).toBeInTheDocument();
            expect(screen.getByText("testuser@example.com")).toBeInTheDocument();
        });
    });

    test("redirects to login page when the user is not authenticated", async () => {
        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
          });
        (checkAuth as jest.Mock).mockResolvedValue(false);

        render(<MemoryRouter><ProfilePage /></MemoryRouter>);

        await waitFor(() => {
            expect(screen.getByText("You need to be logged in to access this page. Redirecting...")).toBeInTheDocument();
        });
        
        jest.runAllTimers();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test("displays default values when the user is authenticated but the user data is not available", async () => {
        mockUseAuth.mockReturnValue({
            user: { id: "123", name: "Test User" },
            isAuthenticated: true,
          });
        (checkAuth as jest.Mock).mockResolvedValue(true);
        (getCurrentUser as jest.Mock).mockResolvedValue(undefined);

        render(<MemoryRouter><ProfilePage /></MemoryRouter>);

        await waitFor(() => {
            expect(screen.getByText("Cannot find username")).toBeInTheDocument();
            expect(screen.getByText("Cannot find email")).toBeInTheDocument();
        });
    });
});