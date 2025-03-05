import { CloseButton, Row, Col } from "react-bootstrap";
import "../styles/feed.css";

interface TopicCardsProps {
    name: string;
    onTopicRemoved: (topic: string) => void;
}

function TopicCard({ name, onTopicRemoved }: TopicCardsProps) {
    return (
        <Row className="row-TopicCard">
            <Col>
                <p style={{ margin: "0px" }}>{name}</p>
            </Col>
            <Col style={{padding: "0px"}}>
                <CloseButton background-color={"#785964"} onClick={() => onTopicRemoved(name)} />
            </Col>
        </Row>
    )
}

export default TopicCard;