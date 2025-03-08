import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IndividualPosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch the post.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevents click event from bubbling up
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/blog/${id}`);
      alert("Post deleted successfully.");
      navigate("/");
    } catch (err) {
      alert("Failed to delete post.");
      console.error("Error deleting post:", err);
    }
  };

  const handleUpdate = (e) => {
    e.stopPropagation(); // Prevents unwanted clicks
    alert("Update feature coming soon!");
  };

  if (loading)
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (error)
    return <div className="alert alert-danger text-center">{error}</div>;
  if (!post)
    return (
      <div className="alert alert-warning text-center">Post not found.</div>
    );

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-3">{post.title}</h2>
          <p className="card-text text-muted">{post.content}</p>
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-between">
          <button className="btn btn-warning" onClick={handleUpdate}>
            ✏️ Update
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualPosts;
