import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

import CreatePost from "./CreatePost";
import { render, screen, fireEvent} from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { MemoryRouter } from "react-router";
import { checkAuth, createPost } from "../api";

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



describe("CreatePost component", () => {

    let mock: MockAdapter;

    beforeEach(() => {
      mock = new MockAdapter(axios);
      (checkAuth as jest.Mock).mockResolvedValueOnce(true)
  
    });
  
    afterEach(() => {
      mock.reset();
    });


    test("renders form correctly", () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>

        );

        // Check for input fields and buttons
        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Write your post here...")).toBeInTheDocument();
        expect(screen.getByText("Submit Post")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    test("disables submit button when input fields are empty", () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        const submitButton = screen.getByText("Submit Post");

        expect(submitButton).toBeDisabled();
    });

    test("enables submit button when input fields are filled", () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        const submitButton = screen.getByText("Submit Post");
        const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
        const contentInput = screen.getByPlaceholderText("Write your post here...") as HTMLInputElement;


        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(contentInput, { target: { value: "Test Content" } });

        expect(submitButton).not.toBeDisabled();
    });


    test("submitting a post test: succeful alert should appear, inputs should be cleaned", async () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        const submitButton = screen.getByText("Submit Post");
        const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
        const contentInput = screen.getByPlaceholderText("Write your post here...") as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(contentInput, { target: { value: "Test Content" } });

        (createPost as jest.Mock).mockResolvedValueOnce({ id: "123", title: "Test Title", content: "Test Content" });

        fireEvent.click(submitButton);

        //expect success alert to appear
        expect(await screen.findByText(/Post submitted successfully!/i)).toBeInTheDocument();

        //expect inputs to be cleaned
        expect(titleInput.value).toBe("");
        expect(contentInput.value).toBe("");
    });

    test("error alert should appear when post submission fails", async () => {
        (createPost as jest.Mock).mockResolvedValueOnce("error"); // Simulate failure
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        const submitButton = screen.getByText("Submit Post");
        const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
        const contentInput = screen.getByPlaceholderText("Write your post here...") as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(contentInput, { target: { value: "Test Content" } });

        //mock.onPost(`${BASE_URL}/post`).reply(500);

        fireEvent.click(submitButton);

        expect(await screen.findByText(/Something went wrong submitting a post/i)).toBeInTheDocument();
    }
    );

    test("cancel button should navigate to /feed", () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        const cancelButton = screen.getByText("Cancel");

        fireEvent.click(cancelButton);

        expect(mockNavigate).toHaveBeenCalledWith("/feed");
    });
    
    

});