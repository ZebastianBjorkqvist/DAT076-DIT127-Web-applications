import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

import CreatePost from "./createPost";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("CreatePost component", () => {
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

    
});