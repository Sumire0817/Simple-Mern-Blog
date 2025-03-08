import { useState } from "react";
import axios from "axios"; // Import Axios

const ActionButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    setLoading(true); // Start loading

    try {
      await axios.post("http://localhost:5000/api/blog", { title, content });

      alert("Post successfully created!");
      setTitle("");
      setContent("");
      setShowPopup(false);
    } catch (error) {
      alert("Failed to create post. Try again later.");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="d-flex justify-content-center p-3">
      <div className="bg-dark p-3 rounded" style={{ width: "400px" }}>
        <button
          className="btn btn-dark text-light w-100 rounded py-2 shadow border-0"
          onClick={() => setShowPopup(true)}
        >
          Create Post
        </button>
      </div>

      {/* Popup Window */}
      {showPopup && (
        <>
          {/* Bootstrap Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-3"
            onClick={() => setShowPopup(false)}
          ></div>

          <div
            className="position-fixed top-50 start-50 translate-middle bg-light p-4 rounded shadow z-3"
            style={{ width: "300px" }}
          >
            <h5 className="mb-3">New Post</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="btn btn-primary w-100"
              onClick={handleCreatePost}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionButton;
