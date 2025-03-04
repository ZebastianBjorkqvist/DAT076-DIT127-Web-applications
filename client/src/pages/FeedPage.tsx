import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "../components/mainHeader";
import "../styles/feed.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreatePostIcon from "../assets/Pencil 01.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import FeedCard from "../components/feedCard";
import { useEffect, useState } from "react";
import { Post } from "../../../server/src/model/post";
import { getPosts, getPostByTopic} from "../api";
import RedirectComponent from "../components/redirectComponent";
import { useAuth } from "../context/AuthContext";
import SearchComponent from "../components/searchComponent";

const FeedPage = () => {
  const navigate = useNavigate();
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const authContext = useAuth();
  

  /*
  const arr = {
    posts: [
      { title: "first post", text: "first text" },
      { title: "second post", text: "second text" },
    ],
  };
  */
  const searchTopic = async (topic: string) => {
    console.log("searching for topic: ", topic);
    try {
      const ts = await getPostByTopic(topic);
      if (ts.length === 0) {
        console.log("No posts found for topic: ", topic);
        return;
      }
      setPosts(ts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  }

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
      //setIsAuthenticated(false);
      setMessage("You need to be logged in to access this page. Redirecting...");
    } else {
      loadPosts();
    }
  }, []);

  return authContext.isAuthenticated ? (
    <div className="feed-page size_and_colors w-100">
      <Container fluid className="sticky-top">
        <MainHeader />
      </Container>

      <Container fluid className="mt-3 post-container">
        <Row>
          {/* Full-width feed content */}
          <Col xs={2} className="sidebar"></Col>
          <Col xs={8} className="p-4">
            <Container>
              <SearchComponent onSearch={searchTopic} />
              <h2 className="header-text">Welcome to the feed!</h2>
              {posts.map((post) => (
                <FeedCard  title={post.title} description={post.text} />
              ))}
            </Container>
          </Col>
          <Col xs={2} className="sidebar"></Col>
        </Row>
      </Container>

      {/* floating icon for create post in bottom right corner */}
      <div className="floating-icon">
        <Button className="btn-custom" onClick={() => navigate("/newPost")} data-testid="create-post-btn" >
          <img src={CreatePostIcon} alt="Create Post" />
        </Button>
      </div>
    </div>
  ):
  <RedirectComponent message={message} url="" />;
};

export default FeedPage;
