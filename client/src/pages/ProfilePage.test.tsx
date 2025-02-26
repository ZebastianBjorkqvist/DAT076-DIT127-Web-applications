import { render, screen, waitFor } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
import { checkAuth, getCurrentUser } from "../api";
import { MemoryRouter } from "react-router";

// Mock the API functions using Jest
jest.mock("../api", () => ({
    checkAuth: jest.fn(),
    getCurrentUser: jest.fn(),
}));

test("displays username and email when the user is authenticated", async () => {
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