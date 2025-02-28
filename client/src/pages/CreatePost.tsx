import { useEffect, useState } from 'react';
import MainHeader from '../components/mainHeader';
import '../styles/CreatePost.css'
import { useNavigate } from 'react-router-dom'
import { createPost} from '../api';
import RedirectComponent from '../components/redirectComponent';
import { useAuth } from '../context/AuthContext';

export function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [alert, setAlert] = useState({message: "", type: ""});
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const authContext = useAuth();
  

  const handlePostSubmit = async () => {
    if (!postContent.trim() || !postTitle.trim()) {
      setAlert({ type: "danger", message: "Cannot be any empty fields!" });
      return;
    }
    createPost(postTitle, postContent)
      .then((response) => {
        if (typeof response === "string") {
          setAlert({ type: "danger", message: "Something went wrong submitting a post" });
        } else {
          setAlert({ type: "success", message: "Post submitted successfully!" });
          setPostTitle("");
          setPostContent("");
        }
      })
      .catch((error) => {
        console.log("Failed creating a post: ", error.message);
        setAlert({ type: "danger", message: "Something went wrong submitting a post" });
      });
  };

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      //setIsAuthenticated(false);
      setMessage("You need to be logged in to access this page. Redirecting...");
    } 
  }, []);

  return authContext.isAuthenticated ? (
    <>
      <MainHeader />
      <div className="container mt-5 create-post-container text-start">
        <h1 className="mb-4">Create Post</h1>

        {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert({ message: "", type: "" })}></button>
          </div>
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          rows={6}
          placeholder="Write your post here..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/feed")}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handlePostSubmit}
            disabled={!postContent.trim() || !postTitle.trim()}
          >
            Submit Post
          </button>
        </div>
      </div>
    </>
  ):
  <RedirectComponent message={message} url="" />;
}

export default CreatePost;
