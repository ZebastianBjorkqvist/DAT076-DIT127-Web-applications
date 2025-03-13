import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import FeedPage from "./FeedPage";
import { MemoryRouter } from "react-router-dom";
import { getPosts, checkAuth, logout, getPostByTopic } from "../api";

interface Post {
  id: number;
  title: string;
  text: string;
  author: string;
  topics?: string[];
}

jest.mock("../api", () => ({
  getPosts: jest.fn(),
  getPostByTopic: jest.fn(),
  checkAuth: jest.fn(),
  logout: jest.fn(),
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "123", name: "Test User" },
    isAuthenticated: true,
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../components/searchComponent", () => {
  return function DummySearchComponent({
    onSearch,
  }: {
    onSearch: (topic: string) => void;
  }) {
    return (
      <div data-testid="search-component">
        <button onClick={() => onSearch("test")} data-testid="search-button">
          Search
        </button>
      </div>
    );
  };
});

jest.mock("../components/feedCard", () => {
  return function DummyFeedCard({
    title,
    text,
    postId,
  }: {
    title: string;
    text: string;
    topics: string[];
    postId: number;
    user: string;
  }) {
    return (
      <div data-testid={`feed-card-${postId}`}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    );
  };
});

jest.mock("../components/mainHeader", () => {
  return function DummyMainHeader() {
    return (
      <div data-testid="main-header">
        <button data-testid="logo-btn" onClick={() => mockNavigate("/feed")}>
          Logo
        </button>
        <button
          data-testid="profile-btn"
          onClick={() => mockNavigate("/profile")}
        >
          Profile
        </button>
        <button
          data-testid="log-out-btn"
          onClick={() => logout().then(() => mockNavigate("/"))}
        >
          Log Out
        </button>
      </div>
    );
  };
});

describe("Navigation works from the feed page", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    (checkAuth as jest.Mock).mockResolvedValue(true);
    (getPosts as jest.Mock).mockResolvedValue([]);
    mockNavigate.mockClear();
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  test("Create Post button navigates to new post page", async () => {
    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    const createPostButton = screen.getByTestId("create-post-btn");
    await act(async () => {
      fireEvent.click(createPostButton);
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/newPost");
    });
  });

  test("Navbar logo button reloads feedpage", async () => {
    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    const logoButton = screen.getByTestId("logo-btn");
    fireEvent.click(logoButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/feed");
    });
  });

  test("Navbar profile button navigates to profile page", async () => {
    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    const profileButton = screen.getByTestId("profile-btn");
    fireEvent.click(profileButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/profile");
    });
  });

  test("Navbar sign out button navigates to login page", async () => {
    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    const logOutButton = screen.getByTestId("log-out-btn");
    (logout as jest.Mock).mockResolvedValueOnce(true);

    fireEvent.click(logOutButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});

describe("FeedPage Rendering Tests", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    (checkAuth as jest.Mock).mockResolvedValue(true);
    (getPosts as jest.Mock).mockResolvedValue([]);
    mockNavigate.mockClear(); // Make sure this is called
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  test("Checks rendering of feedpage when the post-connection works", async () => {
    const mockPosts: Post[] = [
      {
        title: "First Post",
        text: "This is the first post",
        id: 1,
        author: "User1",
        topics: ["topic1"],
      },
      {
        title: "Second Post",
        text: "This is the second post",
        id: 2,
        author: "User2",
        topics: ["topic2"],
      },
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

  test("Correct handling of API error for rendering feedpage", async () => {
    (getPosts as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    // Suppress console errors
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Welcome to the feed!")).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to load posts:",
        expect.any(Error)
      );
    });

    // Restore console
    consoleErrorSpy.mockRestore();
  });

  test("Search functionality updates posts when topic is searched", async () => {
    const allPosts: Post[] = [
      {
        title: "First Post",
        text: "This is the first post",
        id: 1,
        author: "User1",
        topics: ["general"],
      },
      {
        title: "Second Post",
        text: "This is the second post",
        id: 2,
        author: "User2",
        topics: ["general"],
      },
    ];

    const topicPosts: Post[] = [
      {
        title: "Test Topic Post",
        text: "This is a test topic post",
        id: 3,
        author: "User3",
        topics: ["test"],
      },
    ];

    (getPosts as jest.Mock).mockResolvedValue(allPosts);
    (getPostByTopic as jest.Mock).mockResolvedValue(topicPosts);

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    // Initially should show all posts
    await waitFor(() => {
      expect(screen.getByText("Welcome to the feed!")).toBeInTheDocument();
      expect(getPosts).toHaveBeenCalled();
    });

    // Trigger search
    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Should now show topic posts
    await waitFor(() => {
      expect(getPostByTopic).toHaveBeenCalledWith("test");
      expect(screen.getByText("Topic: test")).toBeInTheDocument();
      expect(screen.getByText("Test Topic Post")).toBeInTheDocument();
      expect(screen.getByText("This is a test topic post")).toBeInTheDocument();
    });
  });

  test("No posts found for a topic search", async () => {
    const allPosts: Post[] = [
      {
        title: "First Post",
        text: "This is the first post",
        id: 1,
        author: "User1",
        topics: ["general"],
      },
      {
        title: "Second Post",
        text: "This is the second post",
        id: 2,
        author: "User2",
        topics: ["general"],
      },
    ];

    (getPosts as jest.Mock).mockResolvedValue(allPosts);
    (getPostByTopic as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    // Initially should show all posts
    await waitFor(() => {
      expect(screen.getByText("Welcome to the feed!")).toBeInTheDocument();
    });

    // Trigger search that will return no results
    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Should show "No posts found" message
    await waitFor(() => {
      expect(getPostByTopic).toHaveBeenCalledWith("test");
      expect(
        screen.getByText("No posts found with topic: test")
      ).toBeInTheDocument();
    });
  });
});
