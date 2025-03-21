import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "../components/mainHeader";
import "../styles/feed.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreatePostIcon from "../assets/Pencil 01.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeedCard from "../components/feedCard";
import { useEffect, useState } from "react";
import { getPosts, getPostByTopic, Post } from "../api";
import RedirectComponent from "../components/redirectComponent";
import { useAuth } from "../context/AuthContext";
import SearchComponent from "../components/searchComponent";

const FeedPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("Welcome to the feed!");
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const authContext = useAuth();

  const searchTopic = async (topic: string) => {
    if (topic.length === 0) {
      const ts = await getPosts();
      setPosts(ts);
      setTitle("All posts");
      return;
    }
    try {
      const ts = await getPostByTopic(topic);
      setPosts(ts);
      if (ts.length === 0) {
        setTitle("No posts found with topic: " + topic);
        return;
      }
      setTitle("Topic: " + topic);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  async function loadPosts() {
    try {
      const ts = await getPosts();
      setPosts(ts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  }

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      setMessage(
        "You need to be logged in to access this page. Redirecting..."
      );
    } else {
      loadPosts();
    }
  }, [authContext.isAuthenticated]);

  return authContext.isAuthenticated ? (
    <div className="feed-page size_and_colors w-100">
      <Container fluid className="sticky-top">
        <MainHeader />
      </Container>
      <Container fluid className="mt-3 post-container">
        <Row>
          <Col xs={2} className="sidebar"></Col>
          <Col xs={8} className="p-4">
            <Container>
              <SearchComponent onSearch={searchTopic} />
              <h2 className="header-text">{title}</h2>
              {posts.map((post) => (
                <FeedCard
                  key={post.id}
                  title={post.title}
                  text={post.text}
                  topics={post?.topics ?? []}
                  postId={post.id}
                  user={post.author}
                />
              ))}
            </Container>
          </Col>
          <Col xs={2} className="sidebar"></Col>
        </Row>
      </Container>
      <div className="floating-icon">
        <Button
          className="btn-custom"
          onClick={() => navigate("/newPost")}
          data-testid="create-post-btn"
        >
          <img src={CreatePostIcon} alt="Create Post" />
        </Button>
      </div>
    </div>
  ) : (
    <RedirectComponent message={message} url="" />
  );
};

export default FeedPage;
