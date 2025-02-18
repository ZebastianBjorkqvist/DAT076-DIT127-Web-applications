import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react'
import { getPosts, Post } from "./api";
import MainHeader from "./components/mainHeader";
import "./feed.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreatePostIcon from "./assets/Pencil 01.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import FeedCard from "./components/feedCard";



const FeedPage = () => {
    const navigate = useNavigate(); 
    /*
    Tried something which didn't work yet
    const [posts, setPosts] = useState<post[]>([]);

    async function loadPosts() {
        const ts = await getPosts()
        setPosts(ts)
        
    }
    */


    return (
            
        <div className="feed-page size_and_colors w-100">
            <Container fluid sticky-top>
                <MainHeader />
            </Container>


            <Container fluid className="mt-3">
            <Row>
                {/* Full-width feed content */}
                <Col xs= {2} className="sidebar" ></Col>
                <Col xs = {8} className="p-4">
                <Container>
                    <h2 className="header-text">Welcome to the feed!</h2>
                    <FeedCard />

                </Container>
                <Col xs={2} className="sidebar"></Col>
                    
                </Col>
            </Row>
            </Container>

            {/* floating icon for create post in bottom right corner */}
            <div className="floating-icon">
                <Button className="btn-custom" onClick={() => navigate("/newPost")}>
                    <img
                    src={CreatePostIcon}
                    alt="Create Post"
                    />
                </Button>


            </div>
        </div>
    )
}

export default FeedPage