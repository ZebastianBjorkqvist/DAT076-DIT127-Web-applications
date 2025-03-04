import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TopicCard from "./topicCard";

interface ChooseTopicsProps {
    onTopicsUpdate: (topics: string[]) => void;
}

function ChooseTopics({onTopicsUpdate}:ChooseTopicsProps) {
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState<string[]>([])


    const addTopic = (topic:string) => {
        if(topic.trim() && !topics.includes(topic)){
            const updatedTopics = [...topics, topic];
            setTopics(updatedTopics);
            onTopicsUpdate(updatedTopics);
        }
        setTopic("");
    }

    const removeTopic = (topic:string) => {
        const updatedTopics = topics.filter(t => t !== topic);
        setTopics(updatedTopics);
        onTopicsUpdate(updatedTopics);
    }

    return (
        <>
            <Form>
                <Form.Control type="text" value={topic} placeholder="Enter topic" onChange={(e) => {setTopic(e.target.value)}}/>
                <Button onClick={() => {addTopic(topic)}}>Add topic</Button>
            </Form>
            <div>
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
            </div>
        </>
    );
}

export default ChooseTopics;