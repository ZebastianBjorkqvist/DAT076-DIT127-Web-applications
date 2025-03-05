import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import TopicCard from "./topicCard";

interface ChooseTopicsProps {
    onTopicsUpdate: (topics: string[]) => void;
}

function ChooseTopics({ onTopicsUpdate }: ChooseTopicsProps) {
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState<string[]>([])


    const addTopic = (topic: string) => {
        const isOneWord = /^\w+$/.test(topic.trim());
        if (!isOneWord) {
            alert("Please enter only one word (no spaces or special characters).");
            return;
        }
        if (topic.trim() && !topics.includes(topic)) {
            const updatedTopics = [...topics, topic];
            setTopics(updatedTopics);
            onTopicsUpdate(updatedTopics);
        }
        setTopic("");
    }

    const removeTopic = (topic: string) => {
        const updatedTopics = topics.filter(t => t !== topic);
        setTopics(updatedTopics);
        onTopicsUpdate(updatedTopics);
    }

    return (
        <>
            <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
                <Col>
                    <Form.Control type="text" value={topic} placeholder="Enter topic" onChange={(e) => { setTopic(e.target.value) }} />
                    <Button onClick={() => { addTopic(topic) }} style={{ marginTop: "10px" }}>Add topic</Button>
                </Col>
                <Col>
                    {topics.map(topic => (
                        <TopicCard
                            key={topic}
                            name={topic}
                            onTopicRemoved={(topic: string) => {
                                console.log("Topic should be removed: ", topic);
                                removeTopic(topic);
                            }}
                        />
                    ))}
                </Col>
            </Row>
        </>
    );
}

export default ChooseTopics;