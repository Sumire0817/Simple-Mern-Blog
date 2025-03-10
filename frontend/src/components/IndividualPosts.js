import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IndividualPosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States for the update popup
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

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

  // When update is clicked, prefill the update form and show the popup
  const handleUpdate = (e) => {
    e.stopPropagation(); // Prevents unwanted clicks
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
    setShowUpdatePopup(true);
  };

  // Handle updating the post using the popup data
  const handleUpdatePost = async () => {
    if (!updatedTitle.trim() || !updatedContent.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    setUpdateLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/api/blog/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      alert("Post updated successfully.");
      setPost(response.data); // Update the displayed post with new data
      setShowUpdatePopup(false);
    } catch (error) {
      alert("Failed to update post. Try again later.");
      console.error("Error updating post:", error);
    } finally {
      setUpdateLoading(false);
    }
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

      {/* Update Popup */}
      {showUpdatePopup && (
        <>
          {/* Bootstrap Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-3"
            onClick={() => setShowUpdatePopup(false)}
          ></div>

          <div
            className="position-fixed top-50 start-50 translate-middle bg-light p-4 rounded shadow z-3"
            style={{ width: "300px" }}
          >
            <h5 className="mb-3">Update Post</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Content"
              rows="3"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary w-100"
              onClick={handleUpdatePost}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update Post"}
            </button>
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setShowUpdatePopup(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualPosts;
