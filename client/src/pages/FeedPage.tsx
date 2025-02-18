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
import { Post } from '../../../server/src/model/post';
import { getPosts } from "../api";

const FeedPage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([])

  async function loadPosts() {
    try {
      const ts = await getPosts();
      setPosts(ts);
      console.log(posts);
      
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="feed-page size_and_colors w-100">
      <Container fluid className="sticky-top">
        <MainHeader />
      </Container>

      <Container fluid className="mt-3">
        <Row>
          {/* Full-width feed content */}
          <Col xs={2} className="sidebar"></Col>
          <Col xs={8} className="p-4">
            <Container>
              <h2 className="header-text">Welcome to the feed!</h2>
              <FeedCard />
            </Container>
            {posts.map((p) => (
              <div key={p.id}>{p.author}</div>
            ))}
            <Col xs={2} className="sidebar"></Col>
          </Col>
        </Row>
      </Container>

      {/* floating icon for create post in bottom right corner */}
      <div className="floating-icon">
        <Button className="btn-custom" onClick={() => navigate("/newPost")}>
          <img src={CreatePostIcon} alt="Create Post" />
        </Button>
      </div>
    </div>
  );
};

export default FeedPage;
