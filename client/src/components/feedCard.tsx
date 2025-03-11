import { useState, useEffect } from "react";
import UserIcon from "../assets/User Profile 02.svg";
import "../styles/feed.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { fetchLike, LikeData, setLikeState } from "../api";

interface FeedCardProps {
  title: string;
  text: string;
  topics?: string[];
  postId: number;
  user: string;
}

function FeedCard({ title, text, topics = [], postId, user }: FeedCardProps) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const data: LikeData = await fetchLike(postId);

        setLikeCount(data.likeCount);
        setLiked(data.userLiked);
      } catch (error) {
        console.error("Failed to fetch like data:", error);
        setError("Failed to fetch like data");
      }
    };

    fetchLikeData();
  }, [postId]);

  const handleLike = async () => {
    try {
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

      await setLikeState(postId, newLiked);
    } catch (error) {
      console.error("Failed to update like:", error);
      setLiked(liked);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
      setError("Failed to update like");
    }
  };

  return (
    <div className="post-card">
      <Row className="post-card-header">
        <Col>
          <header className="header-text">{title}</header>
        </Col>
        <Col className="justify-content-end d-flex align-items-center">
          <img src={UserIcon} alt="User Icon" className="img" width="50" />
          <header> {user}</header>
        </Col>
      </Row>
      <Row>
        <Col className="text-start">
          <p className="post-card-topic-text">
            Topics: {topics.length > 0 ? topics.join(", ") : "no topics"}
          </p>
        </Col>
      </Row>
      <Row className="post-card-text">
        <p>{text}</p>
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
