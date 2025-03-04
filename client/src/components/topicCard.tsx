import { Card, CloseButton } from "react-bootstrap";

interface TopicCardsProps {
    name: string;
    onTopicRemoved: (topic: string) => void;
}

function TopicCard({name, onTopicRemoved}:TopicCardsProps) {
    return (
        <Card>
            <p>{name}</p>
            <CloseButton onClick={()=> onTopicRemoved(name)}/>
        </Card>
    )
}

export default TopicCard;