import { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts. Try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📌 Recent Blog Posts</h2>

      {posts.length === 0 ? (
        <div className="alert alert-warning text-center">
          No posts available.
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                </div>
                <div className="card-footer text-muted text-end">
                  <small>Post ID: {post._id}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
