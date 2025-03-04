import { useState, useEffect } from "react";
import UserIcon from "../assets/User Profile 02.svg";
import "../styles/feed.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { fetchLikes, updateLike } from "../api"; // Assuming these API functions are available

function FeedCard(props: any) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch like data when the component mounts
    const fetchLikeData = async () => {
      try {
        const data = await fetchLikes(props.postId);
        setLikeCount(data.likeCount);
        setLiked(data.userLiked);
      } catch (error) {
        setError("Failed to fetch like data");
      }
    };

    fetchLikeData();
  }, [props.postId]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

    try {
      await updateLike(props.postId, newLiked, props.token);
    } catch (error) {
      setError("Failed to update like");
      setLiked(!newLiked);
      setLikeCount((prev) => (newLiked ? prev - 1 : prev + 1));
    }
  };

  return (
    <div className="post-card">
      <Row className="post-card-header">
        <Col>
          <header className="header-text">{props.title}</header>
        </Col>
        <Col>
          <img src={UserIcon} alt="User Icon" className="img" width="50" />
        </Col>
      </Row>

      <Row className="post-card-text">
        <p>{props.description}</p>
      </Row>

      <Row className="post-card-footer">
        <Col className="d-flex justify-content-start align-items-center">
          <Button
            variant={liked ? "danger" : "outline-danger"}
            className="like-button mx-2 "
            onClick={handleLike}
          >
            {liked ? "❤️" : "♡"}
          </Button>
          <span>{likeCount} Likes</span>{" "}
        </Col>
      </Row>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default FeedCard;
