import UserIcon from "../assets/User Profile 02.svg";
import "../styles/feed.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function feedCard(props: any) {
  return (
    <div className="post-card">
      <Row className="post-card-header">
        <Col>
          <header className="header-text">{props.title} </header>
        </Col>
        <Col>
          <img src={UserIcon} alt="Chatter Logo" className="img" width="50" />
        </Col>
      </Row>

      <Row className="post-card-text">
        <p>{props.description}</p>
      </Row>
    </div>
  );
}

export default feedCard;
