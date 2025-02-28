import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import './CreatePost.css';
import { addPost } from "../store/postSlice";

interface Post {
  title: string;
  content: string;
  author: string;
}

const CreatePost: React.FC<{ onClose: () => void }> = ({ onClose}) => {
  const { token, username } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const API_PORT = process.env.REACT_APP_API_PORT;

  const handleCreatePost = async () => {
    if (!title || !content) {
      setErrorMessage("Title and content are required.");
      return;
    }

    try {
      const tokenToUse = token || localStorage.getItem("token");
      if (!tokenToUse) {
        alert("You must be logged in to create a post.");
        return;
      }

      const newPost = { title, content, author: username };
      const res = await axios.post(`${API_URL}:${API_PORT}/posts`, newPost, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      
      
      dispatch(addPost(res.data.post));
      navigate("/home");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    }
  };


  return (
    <div className="create-post-container">
      <h3>Create Post</h3>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="create-post-btn" onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
