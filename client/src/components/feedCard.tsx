import UserIcon from "../assets/User Profile 02.svg";
import "../styles/feed.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function feedCard() {
  return (
    <div className="post-card">
      <Row className="post-card-header">
        <Col>
            <header className="header-text">Post name </header>
        </Col>
        <Col>
          <img src={UserIcon} alt="Chatter Logo" className="img" width="50" />
        </Col>
      </Row>

      <Row className="post-card-text">
       <text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at pharetra magna. Vivamus tristique lectus sit amet nibh hendrerit scelerisque. Curabitur at semper turpis, non tempus purus. Etiam at ligula in purus varius luctus ut sed nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fringilla dui at nibh vestibulum, at porta felis dictum. Donec leo dolor, auctor ac mattis vel, eleifend a nisl. Donec tristique, velit eget posuere sodales, nulla justo mattis dui, eu iaculis urna justo ac diam. Morbi nec rhoncus nunc. 
        </text>
      </Row>
    </div>
  );
}

export default feedCard;
