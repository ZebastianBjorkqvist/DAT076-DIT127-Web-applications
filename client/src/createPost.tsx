import { useState } from 'react';
import MainHeader from './components/mainHeader';
import Spinner from 'react-bootstrap/Spinner';
import './CreatePost.css'
import { useNavigate } from 'react-router-dom'
import { createPost, getPosts } from './api';

export function CreatePost() {
    const [postContent, setPostContent] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePostSubmit = async () => {
        if (!postContent.trim() || !postTitle.trim()) {
            alert("Post content cannot be empty!");
            return;
        }
        setLoading(true);
        const post = { text: postContent, author: 123, title: postTitle };

        try {
            const response = await fetch("http://localhost:8080/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            alert("Post submitted successfully!");
            navigate('/feed');
        } catch (e) {
            let errorMessage = "An unknown error occurred.";

            if (e instanceof Error) {
                errorMessage = e.message;
            }

            alert(`Failed to submit post: ${errorMessage}`);
        }finally{
            setLoading(false);
        }

    };

    const handlePostSubmit2 = async () => {
        if (!postContent.trim() || !postTitle.trim()) {
            alert("Post content cannot be empty!");
            return;
        }
        setLoading(true);
        createPost(postTitle, postContent).then((response) => {
            if (typeof response === "string") {
                alert("Failed to submit post");
            } else {
                alert("Post submitted successfully!");
                navigate('/feed');
            }
        }).catch((error) => {
            alert("Failed to submit post: " + error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
            <MainHeader />
            <div className="container mt-5 create-post-container text-start">
                <h1 className="mb-4">Create Post</h1>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Title"
                    onChange={(e) => setPostTitle(e.target.value)} />
                <textarea
                    className="form-control mb-3"
                    rows={6}
                    placeholder="Write your post here..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)} />
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => navigate('/feed')}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handlePostSubmit2}
                        disabled={!postContent.trim() || !postTitle.trim()}
                    >
                        Submit Post
                    </button>
                </div>
            </div>
            {loading && (<div className="loading-overlay">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>)}

        </>
    );
}

export default CreatePost;