import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import Modal from "../components/Modal"; // Import Modal component
import CreatePost from "../components/CreatePost"; // Import CreatePost component
import { setPosts, deletePost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import './Home.css'; 

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

const Home: React.FC = () => {
  const { token, username } = useSelector((state: RootState) => state.auth);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const tokenToUse = token || localStorage.getItem("token");

      if (!tokenToUse) {
        alert("Please log in to view posts.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${API_URL}:${API_PORT}/posts`, {
          headers: { Authorization: `Bearer ${tokenToUse}` },
        });
        dispatch(setPosts(res.data));
      } catch (error) {
        alert("Failed to load posts.");
      }
    };

    fetchPosts();
  }, [token, ]);

  const handleDeletePost = async (postId: number) => {
    const tokenToUse = token || localStorage.getItem("token");

    if (!tokenToUse) {
      alert("You must be logged in to delete a post.");
      return;
    }

    try {
      await axios.delete(`${API_URL}:${API_PORT}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      dispatch(deletePost(postId)); // Remove deleted post from the UI
      alert("Post deleted successfully.");
    } catch (error) {
      alert("Failed to delete post.");
    }
  };

  const handleCreatePostClick = () => {
    setIsModalOpen(true); // Open modal when button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };


  return (
    <div className="home-container">
      <h2 className="page-title">Blog Posts</h2>
      {token && (
        <button className="create-post-btn" onClick={handleCreatePostClick}>Create Post</button> // Show button only if the user is logged in
      )}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <CreatePost onClose={handleCloseModal} /> {/* Modal contains the CreatePost form */}
        </Modal>
      )}
      {posts.length === 0 && <p className="no-posts">No posts available.</p>}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <small className="post-author">By {post.author}</small>
            {username == post.author && (
              <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
